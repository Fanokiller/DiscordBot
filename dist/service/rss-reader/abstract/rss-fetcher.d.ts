import RssArticle from "./rss-article";
export default interface RssFetcher {
    fetchArticles(url: string): Promise<RssArticle[]>;
    validateFeed(url: string): Promise<boolean>;
}
export declare function getRssFetcher(): RssFetcher;
