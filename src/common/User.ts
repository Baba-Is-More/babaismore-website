import type { ZodUUID } from "zod";
import * as z from "zod";

export const UserZod = z.object({
    name: z.string(),
    id: z.string(),
    avatar: z.uuidv4(),
});

export type User = z.infer<typeof UserZod>
