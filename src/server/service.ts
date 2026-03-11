import { Project, Tag, User } from "./models";

export async function getUsers() {
    return User.find()
}
export async function getProjects() {
    return Project.find()
}
export async function getTags() {
    return Tag.find()
}