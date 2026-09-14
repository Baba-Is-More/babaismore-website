import * as z from "zod";
import { File } from "../File";

export const Result = z.object({
    files: z.array(File),
    hasMore: z.boolean(),
});

export type Result = z.infer<typeof Result>;
