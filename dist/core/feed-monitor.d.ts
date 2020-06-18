import { LiteClient } from "disharmony";
import Feed from "../models/feed";
import Guild from "../models/guild";
import RssFetcher from "../service/rss-reader/abstract/rss-fetcher";
import ArticlePoster from "./article-poster";
export default class FeedMonitor {
    private client;
    private rssFetcher;
    private articlePoster;
    beginMonitoring(): Promise<void>;
    fetchAndProcessAllGuildFeeds(guild: Guild): Promise<boolean>;
    fetchAndProcessFeed(guild: Guild, feed: Feed): Promise<boolean>;
    constructor(client: LiteClient, rssFetcher: RssFetcher, articlePoster: ArticlePoster);
}
