import type { PopulatedProject } from "../database/models/project";
import type { PopulatedUser } from "../database/models/user";

export function userOwnsProject(
    user: Express.User | null,
    project: PopulatedProject,
): boolean {
    if (!user) return false;
    return userIdMatches(project.author, user.id);
}

export function userIdMatches(user: PopulatedUser, id: string): boolean {
    return user._id.toString() == id;
}
