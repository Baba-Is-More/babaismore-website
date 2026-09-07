import * as z from "zod";

export const SLUG_REGEX = /^[a-z0-9]+(?:[._-][a-z0-9]+)*$/;
export const SLUG_MAX_LENGTH = 30;

const SlugZod = z
    .string()
    .min(1)
    .max(SLUG_MAX_LENGTH)
    .regex(SLUG_REGEX, "lowercase letters, numbers, . _ - only");

export default SlugZod;
