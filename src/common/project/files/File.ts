import * as z from "zod";

export const File = z.object({
    fileName: z.string(),
    fileDate: z.coerce.date(),
    fileDesc: z.string().nullable(),
    version: z.string(),
});

export type File = z.infer<typeof File>;
