import { TRPCError } from "@trpc/server";

export function projectNotFound(): never {
    throw new TRPCError({
        code: "NOT_FOUND",
        message: "project not found",
    });
}

export function userNotFound(): never {
    throw new TRPCError({
        code: "NOT_FOUND",
        message: "user not found",
    });
}

export function userUnauthorizedToUploadProject(): never {
    throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "you must be logged in to upload a project",
    });
}

export function userUnauthorizedToUpdateProject(): never {
    throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "you must be logged in to update a project",
    });
}

export function userUnauthorizedToUploadProjectFile(): never {
    throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "you must be logged in to upload a project file",
    });
}
