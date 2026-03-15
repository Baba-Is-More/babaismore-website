import { SortType, type SearchQuery } from "@common/Search/SearchQuery";
import type { Project } from "@server/models";
import type { SortOrder } from "mongoose";
import type { Query, QueryFilter } from "mongoose";

export function queryToFilter(query: SearchQuery): QueryFilter<typeof Project> {
    return {};
}

// i genuinely do not know what the type of this is
export function queryToSort(query: SearchQuery) {
    switch (query.sort) {
        case SortType.LeastDownloaded: {
            return {};
        }
        case SortType.MostDownloaded: {
            return {};
        }
        case SortType.Newest: {
            return {};
        }
        case SortType.Oldest: {
            return {};
        }
        case SortType.None: {
            return {};
        }
    }
}
