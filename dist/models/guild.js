"use strict";

// Création d'un document automatisé qui répertorie les différentes actualitées par jour sous forme de tableau

Object.defineProperty(exports, "__esModule", { value: true });
const disharmony_1 = require("disharmony");
const feed_1 = require("./feed");
class Guild extends disharmony_1.DisharmonyGuild {
    get feeds() {
        if (!this._feeds)
            this.createFeedsBacking();
        return this._feeds;
    }
    set feeds(value) {
        this.record.feeds = value;
        this.createFeedsBacking();
    }
    get channels() { return this.djs.channels; }
    loadRecord(record) {
        super.loadRecord(record);
        if (!this.record.feeds)
            this.record.feeds = [];
    }
    createFeedsBacking() {
        this._feeds = feed_1.default.getArrayProxy(this.record.feeds, this, "feeds", feed_1.default);
    }
}
exports.default = Guild;
