import { GalleryImage, Project, Tag, User } from "./models/index";

export type Database = {
    projects: typeof Project;
    users: typeof User;
    galleryImages: typeof GalleryImage;
    tags: typeof Tag;
};

export const db: Database = {
    projects: Project,
    users: User,
    galleryImages: GalleryImage,
    tags: Tag,
};
