import type * as fetch from "../fetch";
import type { Query } from "./Query";

// takes in a new copy of fetch.Result (just so i dont have to make a new interface for this...)
// and the original fetch.Result and returns an update Query
export function fromFetchResult(
    edited: fetch.Result,
    original: fetch.Result,
): Query {
    const query: Query = {
        author: original.author,
        slug: original.slug,
    };

    if (edited.title != original.title) {
        query.projectName = edited.title;
    }
    if (edited.slug != original.slug) {
        query.projectSlug = edited.slug;
    }
    if (edited.description != original.description) {
        query.projectDesc = edited.description;
    }
    if (edited.summary != original.summary) {
        query.summary = edited.summary;
    }

    return query;
}
