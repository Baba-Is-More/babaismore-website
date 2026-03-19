import { Project, StarRating } from "@server/models";
import type { IProject } from "@server/models/project";
import type { IUser } from "@server/models/user";
import type { HydratedDocument } from "mongoose";

export async function updateStarRating(project: HydratedDocument<IProject>) {
    const result = await StarRating.aggregate<{ avg: number; count: number }>([
        { $match: { project: project._id } },
        {
            $group: {
                _id: null, // this tells mongoose to just look at the full document, not a spesific field of the document
                avg: { $avg: "$score" },
                count: { $sum: 1 },
            },
        },
    ]);

    project.StarRatingAverage = result[0]?.avg || 0;
    project.StarRatingCount = result[0]?.count || 0;

    await project.save();
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
