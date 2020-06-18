"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const alsatian_1 = require("alsatian");
const typemoq_1 = require("typemoq");
const feed_monitor_1 = require("./feed-monitor");
let FeedMonitorTestFixture = class FeedMonitorTestFixture {
    constructor() {
        this.feedUrl = "feed-url";
        this.channelId = "channel-id";
        this.roleId = "role-id";
        this.articleLink = "article-link";
    }
    setup() {
        this.mockGuild = typemoq_1.Mock.ofType();
        this.mockGuild.setup(x => x.channels).returns(() => new Map([[this.channelId, {}]]));
        this.mockGuild.setup(x => x.feeds).returns(() => [this.mockFeed.object]);
        this.mockArcitlePoster = typemoq_1.Mock.ofType();
        this.mockFeed = typemoq_1.Mock.ofType();
        this.mockFeed.setup(x => x.url).returns(() => this.feedUrl);
        this.mockFeed.setup(x => x.channelId).returns(() => this.channelId);
        this.mockFeed.setup(x => x.roleId).returns(() => this.roleId);
        this.mockArticle = typemoq_1.Mock.ofType();
        this.mockArticle.setup(x => x.link).returns(() => this.articleLink);
        this.mockRssFetcher = typemoq_1.Mock.ofType();
        this.mockRssFetcher
            .setup(x => x.fetchArticles(typemoq_1.It.isAnyString()))
            .returns(() => Promise.resolve([this.mockArticle.object]));
        const client = {};
        client.djs = { guilds: new Map() };
        client.config = { requiredPermissions: 1 };
        this.client = client;
    }
    async article_posted_if_new_article_with_link_not_in_history() {
        // ARRANGE
        this.mockFeed.setup(x => x.isLinkInHistory(typemoq_1.It.isAnyString())).returns(() => false);
        // ACT
        const sut = new feed_monitor_1.default(this.client, this.mockRssFetcher.object, this.mockArcitlePoster.object);
        const didPostNewArticle = await sut.fetchAndProcessFeed(this.mockGuild.object, this.mockFeed.object);
        // ASSERT
        alsatian_1.Expect(didPostNewArticle).toBe(true);
        this.mockArcitlePoster.verify(x => x.postArticle(this.mockGuild.object, this.channelId, this.mockArticle.object, this.roleId), typemoq_1.Times.once());
    }
    async link_pushed_to_history_if_new_article_with_link_not_in_history() {
        // ARRANGE
        this.mockFeed.setup(x => x.isLinkInHistory(typemoq_1.It.isAnyString())).returns(() => false);
        // ACT
        const sut = new feed_monitor_1.default(this.client, this.mockRssFetcher.object, this.mockArcitlePoster.object);
        await sut.fetchAndProcessFeed(this.mockGuild.object, this.mockFeed.object);
        // ASSERT
        this.mockFeed.verify(x => x.pushHistory(this.articleLink), typemoq_1.Times.once());
    }
    async article_not_posted_or_stored_if_link_already_in_history() {
        // ARRANGE
        this.mockFeed.setup(x => x.isLinkInHistory(typemoq_1.It.isAnyString())).returns(() => true);
        // ACT
        const sut = new feed_monitor_1.default(this.client, this.mockRssFetcher.object, this.mockArcitlePoster.object);
        const didPostNewArticle = await sut.fetchAndProcessFeed(this.mockGuild.object, this.mockFeed.object);
        // ASSERT
        alsatian_1.Expect(didPostNewArticle).toBe(false);
        this.mockArcitlePoster.verify(x => x.postArticle(typemoq_1.It.isAny(), typemoq_1.It.isAny(), typemoq_1.It.isAny(), typemoq_1.It.isAny()), typemoq_1.Times.never());
        this.mockFeed.verify(x => x.pushHistory(typemoq_1.It.isAnyString()), typemoq_1.Times.never());
    }
    async no_exception_thrown_if_no_articles() {
        // ARRANGE
        void (this.mockRssFetcher.object.fetchArticles(""));
        this.mockRssFetcher.setup(x => x.fetchArticles(typemoq_1.It.isAnyString())).returns(() => Promise.resolve([]));
        // ACT
        const sut = new feed_monitor_1.default(this.client, this.mockRssFetcher.object, this.mockArcitlePoster.object);
        const didPostNewArticle = await sut.fetchAndProcessFeed(this.mockGuild.object, this.mockFeed.object);
        // ASSERT
        alsatian_1.Expect(didPostNewArticle).toBe(false);
        // Expect no exception to be thrown (test will fail on exceptions)
    }
    async feed_not_processed_if_channel_doesnt_exist() {
        // ARRANGE
        // tslint:disable-next-line: no-unused-expression
        void (this.mockFeed.object.channelId);
        this.mockFeed.setup(x => x.channelId).returns(() => "non-existent-channel");
        // ACT
        const sut = new feed_monitor_1.default(this.client, this.mockRssFetcher.object, this.mockArcitlePoster.object);
        const didPostNewArticle = await sut.fetchAndProcessFeed(this.mockGuild.object, this.mockFeed.object);
        // ASSERT
        alsatian_1.Expect(didPostNewArticle).toBe(false);
        this.mockArcitlePoster.verify(x => x.postArticle(typemoq_1.It.isAny(), typemoq_1.It.isAny(), typemoq_1.It.isAny(), typemoq_1.It.isAny()), typemoq_1.Times.never());
    }
};
__decorate([
    alsatian_1.Setup
], FeedMonitorTestFixture.prototype, "setup", null);
__decorate([
    alsatian_1.Test()
], FeedMonitorTestFixture.prototype, "article_posted_if_new_article_with_link_not_in_history", null);
__decorate([
    alsatian_1.Test()
], FeedMonitorTestFixture.prototype, "link_pushed_to_history_if_new_article_with_link_not_in_history", null);
__decorate([
    alsatian_1.Test()
], FeedMonitorTestFixture.prototype, "article_not_posted_or_stored_if_link_already_in_history", null);
__decorate([
    alsatian_1.Test()
], FeedMonitorTestFixture.prototype, "no_exception_thrown_if_no_articles", null);
__decorate([
    alsatian_1.Test()
], FeedMonitorTestFixture.prototype, "feed_not_processed_if_channel_doesnt_exist", null);
FeedMonitorTestFixture = __decorate([
    alsatian_1.TestFixture("Feed monitor")
], FeedMonitorTestFixture);
exports.FeedMonitorTestFixture = FeedMonitorTestFixture;
//# sourceMappingURL=feed-monitor.spec.js.map