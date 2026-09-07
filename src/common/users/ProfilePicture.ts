import * as z from "zod";

/*
 * to be referenced by `default:$this`
 */
export const DEFAULT_PROFILE_PICTURES = ["rock", "baba", "keke", "me"] as const;

export type DefaultProfilePicture = (typeof DEFAULT_PROFILE_PICTURES)[number];

export const ProfilePictureZod = z.union([
    z.templateLiteral(["default:", z.enum(DEFAULT_PROFILE_PICTURES)]),
    z.templateLiteral(["custom:", z.uuid()]),
]);

export type ProfilePicture = z.infer<typeof ProfilePictureZod>;
