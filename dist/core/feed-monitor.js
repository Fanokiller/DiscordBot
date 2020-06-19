"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const disharmony_1 = require("disharmony");
const guild_1 = require("../models/guild");
const rss_fetcher_1 = require("../service/rss-reader/abstract/rss-fetcher");
const article_poster_1 = require("./article-poster");
class FeedMonitor {
    constructor(client, rssFetcher, articlePoster) {
        this.client = client;
        this.rssFetcher = rssFetcher;
        this.articlePoster = articlePoster;
    }
    async beginMonitoring() {
        //si le client n'est pas déconnecté

        while (this.client.djs.status !== 5)
            for (const djsGuild of this.client.djs.guilds.values()) {
                const guild = new guild_1.default(djsGuild);
                // Autorise la file d'attente des événements à se vider avant de traiter la prochaine guilde si aucune autorisation n'est présente
                if (!guild.hasPermissions(this.client.config.requiredPermissions)) {
                    await new Promise((resolve) => setImmediate(resolve));
                    continue;
                }
                await guild.loadDocument();
                const didPostNewArticle = await this.fetchAndProcessAllGuildFeeds(guild);
                if (didPostNewArticle)
                    await guild.save();
            }
        // Atteindre ce code signifie que la boucle est terminée ci-dessus, ce qui signifie que le bot est déconnecté
        await disharmony_1.Logger.debugLogError(`le moniteur de flux est déconnecté de Discord !`);
        await disharmony_1.Logger.logEvent("FeedMonitorDisconnect");
        process.exit(1);
    }
    // Récupération et processus de TOUT les nouveaux flux
    async fetchAndProcessAllGuildFeeds(guild) {
        let didPostNewArticle = false;
        for (const feed of guild.feeds)
            didPostNewArticle = await this.fetchAndProcessFeed(guild, feed) || didPostNewArticle;
        return didPostNewArticle;
    }
    // Récupération et Processus des flux
    async fetchAndProcessFeed(guild, feed) {
        try {
            if (!guild.channels.has(feed.channelId))
                return false;
            const articles = await this.rssFetcher.fetchArticles(feed.url);
            if (articles.length === 0)
                return false;
            const article = articles[0], link = article.link;
            if (!link || feed.isLinkInHistory(link))
                return false;
            feed.pushHistory(link);
            await this.articlePoster.postArticle(guild, feed.channelId, article, feed.roleId);
            return true;
        }
        catch (e) {
            disharmony_1.Logger.debugLogError(`Erreur lors de la récupération de flux ${feed.url} en accord avec ${guild.name}`, e);
            return false;
        }
    }
}
exports.default = FeedMonitor;
if (!module.parent) {
    const configPath = process.argv[2];
    const config = disharmony_1.loadConfig(undefined, configPath);
    const client = new disharmony_1.LiteDisharmonyClient(config);
    const articlePoster = new article_poster_1.default();
    const feedMonitor = new FeedMonitor(client, rss_fetcher_1.getRssFetcher(), articlePoster);
    client.login(config.token)
        .then(() => feedMonitor.beginMonitoring())
        .catch(async (err) => {
            await disharmony_1.Logger.debugLogError("Error initialising feed monitor", err);
            process.exit(1);
        });
}
