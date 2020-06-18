import RssArticle from "./abstract/rss-article";
import RssFetcher from "./abstract/rss-fetcher";
export declare class RssParser implements RssFetcher {
    private parser;
    fetchArticles(url: string): Promise<RssArticle[]>;
    validateFeed(url: string): Promise<boolean>;
    constructor(parser?: any);
}
