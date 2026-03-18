import { Project, StarRating } from "@server/models";
import type { IProject } from "@server/models/project";
import type { IUser } from "@server/models/user";
import type { HydratedDocument } from "mongoose";

export async function updateStarRating(project: HydratedDocument<IProject>) {
    const result = await StarRating.aggregate<{ avg: number; count: number }>([
        { $match: { project: project._id } },
        {
            $group: {
                avg: { $avg: "$score" },
                count: { $sum: 1 },
            },
        },
    ]);

    await Project.updateOne(
        { _id: project._id },
        {
            $set: {
                StarRatingAverage: result[0]?.avg || 0,
                StarRatingCount: result[0]?.count || 0,
            },
        },
    );
}

export async function createOrUpdateUserRating(
    user: HydratedDocument<IUser>,
    project: HydratedDocument<IProject>,
    new_rating: number,
) {
    await StarRating.updateOne(
        { author: user, project: project },
        { $set: { score: new_rating } },
        { upsert: true }, // we do want to create one if it doesnt exist
    );
}
