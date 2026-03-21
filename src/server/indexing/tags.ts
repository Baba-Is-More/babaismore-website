import { db } from "@server/database";
import type { ITag } from "@server/database/models/tag";

export async function tagsToObjectId(tags: string[]): Promise<ITag[]> {
    return await db.tags.find({
        tagName: { $in: tags },
    });
}
