import type * as user from "@common/users";
import type { PopulatedUser } from "../database/models/user";

export function userToFetchResult(
    user: PopulatedUser,
    isYou: boolean,
): user.fetch.Result {
    return {
        username: user.username,
        displayName: user.displayName,
        profilePicture: user.profilePicture,
        userIsYou: isYou,
    };
}
