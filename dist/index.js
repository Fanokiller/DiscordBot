"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cluster = require("cluster");
const disharmony_1 = require("disharmony");
const disharmony_2 = require("disharmony");
const path_1 = require("path");
const commands_1 = require("./commands");
const article_poster_1 = require("./core/article-poster");
const message_handler_1 = require("./core/message-handler");
const message_1 = require("./models/message");
const rss_fetcher_1 = require("./service/rss-reader/abstract/rss-fetcher");
const config = disharmony_2.loadConfig();
if (Cluster.isMaster) {
    const client = new disharmony_1.DisharmonyClient(commands_1.default, config, message_1.default);
    client.onMessage.sub(message_handler_1.default);
    client.login(config.token)
        .then(() => startFeedMonitor(client, !config.computedValues.isLocalDb))
        .catch(async (err) => {
        await disharmony_1.Logger.consoleLogError("Erreur durant l'initialisation", err);
        process.exit(1);
    });
}
// Fonction qui sert au démarrage du moniteur
async function startFeedMonitor(client, useForkedProcess) {
    const path = "./core/feed-monitor";
    if (useForkedProcess) {
        const worker = disharmony_1.forkWorkerClient(path_1.resolve(__dirname, path), config.computedValues.configPath);
        worker.on("sortie", (code) => process.exit(code));
    }
    else {
        const FeedMonitor = (await Promise.resolve().then(() => require(path))).default;
        new FeedMonitor(client, rss_fetcher_1.getRssFetcher(), new article_poster_1.default()).beginMonitoring();
    }
}
