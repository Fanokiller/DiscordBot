"use strict";

//Analyse du flux rss

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
        /* On utilise un lien existent */
        return !!(await this.parser.parseURL(url)).title;
    }
}
exports.RssParser = RssParser;
