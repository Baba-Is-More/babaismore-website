import type * as project from "@common/project";
import type { IProjectFile } from "../database/models/projectFile";

export function projectFileToFile(file: IProjectFile): project.files.File {
    return {
        fileName: file.fileName,
        fileDate: file.fileDate,
        fileDesc: file.fileDesc,
        version: file.version,
    };
}
