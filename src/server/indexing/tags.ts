import type { TagQuery } from "@common/Search/SearchQuery";
import { Tag } from "@server/models";
import type { ITag } from "@server/models/tag";

export async function tagsToObjectId(tags: string[]): Promise<ITag[]> {
    return await Tag.find({
        tagName: { $in: tags },
    });
}
