import { type HydratedDocument } from "mongoose";
import { type IUser } from "../database/models/user";
import bcrypt from "bcrypt";

export async function comparePassword(
    user: HydratedDocument<IUser>,
    candidatePassword: string,
): Promise<boolean> {
    return bcrypt.compare(candidatePassword, user.password);
}
