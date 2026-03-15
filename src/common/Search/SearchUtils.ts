import type { Url } from "url";
import { SortType, TagQuery, type SearchQuery } from "./SearchQuery";

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
    }
}

export function stringToSortType(str: string | null): SortType | null {
    switch (str) {
        case "least_downloaded": {
            return SortType.LeastDownloaded;
        }
        case "most_downloaded": {
            return SortType.MostDownloaded;
        }
        case "newest": {
            return SortType.Newest;
        }
        case "oldest": {
            return SortType.Oldest;
        }
    }
    return null;
}

// untested!
export function queryIntoURLSuffix(query: SearchQuery): string {
    let ret = "/search?";
    if (query.keywords.length != 0) {
        ret = ret.concat("q=");
        for (let keyword of query.keywords) {
            ret = ret.concat(keyword, "+");
        }
    }
    if (query.tags.length != 0) {
        for (let tag of query.tags) {
            if (tag.is_negated) {
                ret = ret.concat("&", "t=", "-", tag.tag);
            } else {
                ret = ret.concat("&", "t=", tag.tag);
            }
        }
    }
    if (query.sort == SortType.Newest) {
        ret = ret.concat("&", "s=", sortToString(query.sort));
    }
    return ret;
}

function toTagQuery(str: string): TagQuery {
    const is_negated = str.startsWith("-");
    return {
        is_negated,
        tag: is_negated ? str.slice(1) : str,
    };
}

function isTagFilter(str: string): boolean {
    return str.startsWith("tag:");
}

export function parseUrlToQuery(url: URLSearchParams): SearchQuery {
    const raw_keywords = (url.get("q") ?? "") // gets the query param, or an empty string if there is none
        .split(" ") // every + turns into a space so we split it by spaces
        .filter((v) => Boolean(v)); // if the split resulted in an empty string, such as when there are two spaces, we can get rid of it

    const keywords = raw_keywords.filter((v) => !isTagFilter(v));
    const query_tags = raw_keywords
        .filter((v) => isTagFilter(v)) // filter only for `tag:`
        .map((v) => v.slice(4)) // remove four characters to remove the `tag:`
        .map((v) => v.toLowerCase()) // turn all tags into lowercase
        .map(toTagQuery); // turn it into TagQuery[]

    const url_tags: TagQuery[] = url.getAll("t").map(toTagQuery);
    const tags: TagQuery[] = [...url_tags, ...query_tags];

    const sort = stringToSortType(url.get("s")) ?? SortType.Newest;
    return {
        keywords,
        sort,
        tags,
    };
}
