export class SearchQuery {
    keywords: string;
    tags: string[];
    sort: string;

    public constructor(keywords: string) {
        this.keywords = keywords;
        this.tags = [];
        this.sort = "default";
    }

    public intoURLSuffix(): string {
        let ret = "/search?";
        if (this.keywords.length != 0) {
            ret = ret.concat("q=", this.keywords);
        }
        if (this.tags.length != 0) {
            for (let tag in this.tags) {
                ret = ret.concat("&", "t=", tag);
            }
        }
        if (this.sort.length != 0) {
            ret = ret.concat("&", "s=", this.sort);
        }
        return ret;
    }
}
