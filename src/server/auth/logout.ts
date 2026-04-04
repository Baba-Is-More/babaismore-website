import type { LoginQuery } from "@common/login/loginQuery";
import type { Context } from "@server/context";
import { db } from "@server/database";
import type { IUser } from "@server/database/models/user";
import { TRPCError } from "@trpc/server";
import type { HydratedDocument } from "mongoose";
import { comparePassword } from "./compare";

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
