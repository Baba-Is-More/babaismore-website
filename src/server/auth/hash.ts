import bcrypt from "bcrypt";

// this function might seem useless, but i think it will help
// make sure we always know where passwords are being hashed
export async function hashPassword(plainPassword: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(plainPassword, salt);

    return hashed;
}
