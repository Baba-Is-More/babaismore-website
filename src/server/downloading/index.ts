// downloading has to be more complicated because TRPC cant return binary blobs!

import type * as project from "@common/project";
import type {
    IProject,
    PopulatedProject,
} from "@server/database/models/project";
import type { IProjectFile } from "@server/database/models/projectFile";
import { getOneProject } from "@server/database/queries";
import { fileNotFound, projectNotFound } from "@server/errors";
import { buildFetchFilter } from "@server/filters/fetchFilter";
import { userOwnsProject } from "@server/helpers/user";
import type { Response } from "express";
import type { QueryFilter } from "mongoose";
import path from "node:path";
import fs from "node:fs";

export async function HandleDownload(
    input: project.files.download.Query,
    user: Express.User | null,
    res: Response,
) {
    const filter: QueryFilter<IProject> = await buildFetchFilter(
        input.author,
        input.slug,
    );
    const found: PopulatedProject =
        (await getOneProject(filter)) ?? projectNotFound();

    if (!found.unlisted || (found.unlisted && userOwnsProject(user, found))) {
        // all good
    } else {
        projectNotFound();
    }

    const hasFile: IProjectFile | undefined = found.files.find(
        (file) => file.fileName == input.fileName,
    );

    if (!hasFile) fileNotFound();

    const filepath = path.join(
        import.meta.dirname,
        "../../../",
        "app/uploads",
        hasFile.fileName,
    );

    if (!fs.existsSync(filepath)) {
        fileNotFound();
    }

    res.download(filepath, hasFile.version);
}
