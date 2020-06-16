"use strict";

// Mise en place d'un système de récupération pour analyse

Object.defineProperty(exports, "__esModule", { value: true });
const rss_parser_1 = require("../rss-parser");
let rssReader;
function getRssFetcher() {
    if (!rssReader)
        rssReader = new rss_parser_1.RssParser();
    return rssReader;
}
exports.getRssFetcher = getRssFetcher;
