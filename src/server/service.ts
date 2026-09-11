import type * as project from "@common/project";
import type { upload } from "@common/project";
import type { IProject, PopulatedProject } from "./database/models/project";
import type { PopulatedUser } from "./database/models/user";
import { TRPCError } from "@trpc/server";
import { db, type Database } from "./database";
import {
    getOneProject,
    getManyProjects,
    upsertTag,
    userToObjectId,
} from "./database/queries";
import {
    projectNotFound,
    userNotFound,
    userUnauthorizedToUpdateProject,
    userUnauthorizedToUploadProject,
    userUnauthorizedToUploadProjectFile,
} from "./errors";
import { projectToFetchResult } from "./mappers/fetchProject";
import { projectToSearchResult } from "./mappers/searchProjects";
import { userToFetchResult } from "./mappers/fetchUser";
import { buildFetchFilter } from "./filters/fetchFilter";
import { buildProjectsFilter } from "./filters/searchFilter";
import { userOwnsProject, userIdMatches } from "./helpers/user";
import type { LoginQuery } from "@common/login/loginQuery";
import type { SignupQuery } from "@common/signup/SignupQuery";
import { getRandomProfile } from "@common/users/ProfilePicture";
import { comparePassword } from "./auth/compare";
import { hashPassword } from "./auth/hash";
import { checkEmail, checkUsername } from "./auth/checks";
import type { QueryFilter, Types } from "mongoose";
import type { Context } from "./context";
import type { MeResult } from "@common/users/MeResult";
import type { UserFetchQuery } from "@common/fetch/UserFetchQuery";
import type { UserFetchResult } from "@common/fetch/UserFetchResult";
import { createWriteStream } from "node:fs";
import path from "node:path";
import { Writable } from "node:stream";
import { v4 as uuidv4 } from "uuid";

export async function fetchProject(
    query: project.fetch.Query,
    user: Express.User | null,
): Promise<project.fetch.Result> {
    const filter: QueryFilter<IProject> = await buildFetchFilter(
        query.author,
        query.slug,
    );
    const found: PopulatedProject =
        (await getOneProject(filter)) ?? projectNotFound();

    const isOwner: boolean = userOwnsProject(user, found);

    if (found.unlisted && !isOwner) projectNotFound();

    return projectToFetchResult(found, isOwner);
}

export async function searchProjects(
    query: project.search.Query,
): Promise<project.search.Result[]> {
    const filter: QueryFilter<IProject> = await buildProjectsFilter(query);
    const projects: PopulatedProject[] = await getManyProjects(filter);

    const results: project.search.Result[] = projects.map(
        projectToSearchResult,
    );

    return results;
}

export async function fetchUser(
    query: UserFetchQuery,
    viwerUser: Express.User | null,
): Promise<UserFetchResult> {
    const fetchedUser: PopulatedUser =
        (await userToObjectId(query.username)) ?? userNotFound();

    const isYou: boolean =
        viwerUser != null && userIdMatches(fetchedUser, viwerUser.id);

    return userToFetchResult(fetchedUser, isYou);
}

export async function userMe(user: Express.User | null): Promise<MeResult> {
    if (user == null) return { is_logged_in: false };

    const id: string = user.id;
    const found: PopulatedUser | null = await db.users.findById(id);

    if (!found) return { is_logged_in: false };

    return {
        is_logged_in: true,
        data: {
            displayName: found.displayName,
            profilePicture: found.profilePicture,
            username: found.username,
        },
    };
}

export async function createProject(
    query: project.create.Query,
    user: Express.User | null,
): Promise<void> {
    if (!user) userUnauthorizedToUploadProject();

    const names = query.tags
        .map((t) => t.trim().toLowerCase())
        .filter((name) => name.length > 0);
    const tags: Types.ObjectId[] = await Promise.all(names.map(upsertTag));

    const project = new db.projects({
        author: user.id,
        projectName: query.projectName,
        projectSlug: query.projectSlug,
        projectDesc: query.projectDesc,
        summary: query.summary,
        posted: new Date().toISOString(),
        unlisted: true,
        downloads: 0,
        tags,
        galleryImages: query.galleryImages,
    });

    await project.save();
}

export async function updateProject(
    query: project.update.Query,
    user: Express.User | null,
): Promise<void> {
    if (!user) userUnauthorizedToUpdateProject();

    const filter: QueryFilter<IProject> = await buildFetchFilter(
        query.author,
        query.slug,
    );
    const found = (await getOneProject(filter)) ?? projectNotFound();

    const isEditable: boolean = userIdMatches(found.author, user.id);

    // i dont feel like doing further checks to know if the project is listed or not
    // so i just return this and get it over with.
    if (!isEditable) projectNotFound();

    if (query.projectName != undefined) found.projectName = query.projectName;
    if (query.projectSlug != undefined) found.projectSlug = query.projectSlug;
    if (query.projectDesc != undefined) found.projectDesc = query.projectDesc;
    if (query.summary != undefined) found.summary = query.summary;

    await found.save();
}

export async function uploadProject(
    input: upload.Query,
    user: Express.User | null,
) {
    const MAX_UPLOAD_BYTES = 2 * 1024 * 1024;

    if (!user) userUnauthorizedToUploadProjectFile();

    const { file, author, projectSlug } = input;

    if (file.size > MAX_UPLOAD_BYTES) {
        throw new Error("file exceeds size limit");
    }

    const filter: QueryFilter<IProject> = await buildFetchFilter(
        author,
        projectSlug,
    );
    const project = (await getOneProject(filter)) ?? projectNotFound();

    // im too lazy to further check if the project is listed or not,
    // so this will do.
    if (!userIdMatches(project.author, user.id)) projectNotFound();

    const fileName = uuidv4();
    const filepath = path.join(
        import.meta.dirname,
        "../../",
        "app/uploads/",
        fileName,
    );

    await file.stream().pipeTo(Writable.toWeb(createWriteStream(filepath)), {
        signal: AbortSignal.timeout(30_000),
    });

    project.files.unshift({
        fileName,
        fileDate: new Date(),
        fileDesc: null,
        version: `Version ${project.files.length}`,
    });
    await project.save();

    return { fileName };
}

export async function login(query: LoginQuery, ctx: Context) {
    const user: PopulatedUser | null = await db.users.findOne({
        email: query.username,
    });

    if (!user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const is_valid = await comparePassword(user, query.plainPassword);

    if (!is_valid) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    // all is fine
    const express_user: Express.User = {
        id: user._id.toString(),
    };

    await new Promise<void>((resolve, reject) => {
        ctx.req.login(express_user, (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
}

export async function logout(ctx: Context) {
    if (ctx.req.isUnauthenticated()) {
        throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "not logged in",
        });
    }

    await new Promise<void>((resolve, reject) => {
        ctx.req.logout({}, (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
}

export async function signup(query: SignupQuery) {
    const emailTaken = await checkEmail(query.email);
    const usernameTaken = await checkUsername(query.username);

    if (emailTaken) {
        throw new TRPCError({
            code: "CONFLICT",
            message: "Email already taken",
        });
    }

    if (usernameTaken) {
        throw new TRPCError({
            code: "CONFLICT",
            message: "Username already taken",
        });
    }

    // if not, we can make a new account

    const hashedPassword = await hashPassword(query.password);
    const randomProfilePicture = getRandomProfile();

    const newUser: PopulatedUser = new db.users({
        displayName: query.displayName,
        email: query.email,
        password: hashedPassword,
        username: query.username,
        profilePicture: randomProfilePicture,
    });

    await newUser.save();

    console.log("made a user!");
}
