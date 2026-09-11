import type { PopulatedUser } from "../database/models/user";
import type { UserFetchResult } from "@common/fetch/UserFetchResult";

export function userToFetchResult(
    user: PopulatedUser,
    isYou: boolean,
): UserFetchResult {
    return {
        username: user.username,
        displayName: user.displayName,
        profilePicture: user.profilePicture,
        userIsYou: isYou,
    };
}
