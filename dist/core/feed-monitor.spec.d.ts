export declare class FeedMonitorTestFixture {
    private feedUrl;
    channelId: string;
    roleId: string;
    articleLink: string;
    private client;
    private mockArcitlePoster;
    private mockGuild;
    private mockFeed;
    private mockArticle;
    private mockRssFetcher;
    setup(): void;
    article_posted_if_new_article_with_link_not_in_history(): Promise<void>;
    link_pushed_to_history_if_new_article_with_link_not_in_history(): Promise<void>;
    article_not_posted_or_stored_if_link_already_in_history(): Promise<void>;
    no_exception_thrown_if_no_articles(): Promise<void>;
    feed_not_processed_if_channel_doesnt_exist(): Promise<void>;
}
