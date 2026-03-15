import { SortType, type SearchQuery } from "./SearchQuery";

export function sortToString(sort: SortType): string {
    switch (sort) {
        case SortType.LeastDownloaded: {
            return "least_downloaded";
        }
        case SortType.MostDownloaded: {
            return "most_downloaded";
        }
        case SortType.Newest: {
            return "newest";
        }
        case SortType.Oldest: {
            return "oldest";
        }
        case SortType.None: {
            return "none";
        }
    }
}

// untested!
export function queryIntoURLSuffix(query: SearchQuery): string {
    let ret = "/search?";
    if (query.keywords.length != 0) {
        ret = ret.concat("q=", query.keywords);
    }
    if (query.tags.length != 0) {
        for (let tag in query.tags) {
            ret = ret.concat("&", "t=", tag);
        }
    }
    if (query.sort == SortType.None) {
        ret = ret.concat("&", "s=", sortToString(query.sort));
    }
    return ret;
}
