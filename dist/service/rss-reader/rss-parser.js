"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parser = require("rss-parser");
class RssParser {
    constructor(
    // @ts-ignore
    parser = new Parser({ timeout: 5000 })) {
        this.parser = parser;
    }
    async fetchArticles(url) {
        return (await this.parser.parseURL(url)).items;
    }
    async validateFeed(url) {
        /* Use the existence of a title to determine the validity of a feed.
           It's not particularly clear what elements make up the minimum valid feed,
           but a few online sources indicate that a title is one such necessary component. */
        return !!(await this.parser.parseURL(url)).title;
    }
}
exports.RssParser = RssParser;
