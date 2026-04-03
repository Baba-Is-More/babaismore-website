import type { LoginQuery } from "@common/login/loginQuery";
import type { Context } from "@server/context";
import { db } from "@server/database";
import type { IUser } from "@server/database/models/user";
import { TRPCError } from "@trpc/server";
import type { HydratedDocument } from "mongoose";
import { comparePassword } from "./compare";

export async function login(query: LoginQuery, ctx: Context) {
    const user: HydratedDocument<IUser> | null = await db.users.findOne({
        email: query.username,
    });

    if (!user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const is_valid = await comparePassword(user, query.plainPassword);

    if (!is_valid) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    // all is fine
    const express_user: Express.User = {
        id: user._id.toString(),
    };

    await new Promise<void>((resolve, reject) => {
        ctx.req.login(express_user, (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
}
