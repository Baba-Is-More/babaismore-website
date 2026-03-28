import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { db } from "../database";
import { comparePassword } from "./compare";
import mongoose from "mongoose";

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email, password, done) => {
            const user = await db.users.findOne({ email: email });

            if (!user) return done(null, false);

            const valid = await comparePassword(user, password);
            if (!valid) return done(null, false);

            return done(null, {
                id: user._id.toString(),
            });
        },
    ),
);

passport.serializeUser((user: Express.User, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: mongoose.Types.ObjectId, done) => {
    const user = await db.users.findById(id);

    if (!user) return done(null, false);

    done(null, {
        id: user._id.toString(),
    });
});

export {};
