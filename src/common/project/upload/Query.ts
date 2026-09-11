import * as z from "zod";
import SlugZod from "@common/slug";

export const Query = z
    .instanceof(FormData)
    .transform((fd) => Object.fromEntries(fd))
    .pipe(
        z.object({
            author: z.string(),
            projectSlug: SlugZod,
            file: z.instanceof(File),
        }),
    );

export type Query = z.infer<typeof Query>;
