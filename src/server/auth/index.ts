import jwt from "jsonwebtoken";
import {} from "./compare";
import {} from "./hash";
import mongoose from "mongoose";

function authMiddleware(req: any, res: any, next: () => void) {
    const token = req.cookies?.token;

    if (!token) {
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!!);
        req.user = decoded;
    } catch (err) {
        req.user = null;
    }

    next();
}

export type JwtPayload = {
    user: mongoose.Types.ObjectId;
};
