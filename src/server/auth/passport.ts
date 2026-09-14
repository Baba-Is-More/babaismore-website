import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { db } from "../database";
import { userFromId } from "../database/queries";
import { comparePassword } from "./compare";

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

            const express_user: Express.User = {
                id: user._id.toString(),
            };

            return done(null, express_user);
        },
    ),
);

// this function just returns the user id from the user session...
passport.serializeUser((user: Express.User, done) => {
    done(null, user.id);
});

// ... which is then send to this function here to be turned back into the object id
passport.deserializeUser(async (id: string, done) => {
    const user = await userFromId(id);

    // i am unsure if database lookup here is actually needed,
    // but a little extra safety cant hurt
    if (!user) return done(null, false);

    done(null, {
        id: user._id.toString(),
    });
});

export {};
