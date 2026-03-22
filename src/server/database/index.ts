import { Project, Tag, User } from "./models/index";

export type Database = {
    projects: typeof Project;
    users: typeof User;
    tags: typeof Tag;
};

export const db: Database = {
    projects: Project,
    users: User,
    tags: Tag,
};
