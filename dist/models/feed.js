"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const disharmony_1 = require("disharmony");
const normaliser_1 = require("../core/normaliser");
class Feed extends disharmony_1.SubDocument {
    constructor() {
        super(...arguments);
        this.maxHistoryCount = 50;
        this.history = [];
    }
    // Vérifie si le flux rss n'a pas déjà été configuré
    isLinkInHistory(link) {
        return this.history.indexOf(normaliser_1.default.forCache(link)) > -1;
    }

    // Classification des liens dans un historique chronoloique récupérable en json
    pushHistory(...links) {
        const newLinks = links.map(x => normaliser_1.default.forCache(x)).filter(x => !this.isLinkInHistory(x));
        Array.prototype.push.apply(this.history, newLinks);
        this.history.splice(0, this.history.length - this.maxHistoryCount);
        this.onPropertyChanged.dispatch("history");
    }

    // Affichage de la classification et informations des différents flux rss enregistré
    toRecord() {
        return {
            id: this.id,
            url: this.url,
            channelId: this.channelId,
            roleId: this.roleId,
            history: this.history,
        };
    }

    //Récupération des données rentrés avec la commande
    loadRecord(record) {
        this.id = record.id;
        this.url = record.url;
        this.channelId = record.channelId;
        this.roleId = record.roleId;
        this.history = record.history;
    }
    // Calque d'affichage
    toFriendlyObject(guild) {
        const channel = guild.channels.get(this.channelId);
        const channelName = channel instanceof discord_js_1.TextChannel ? channel.name : "<<unavailable>>";
        const role = guild.djs.roles.get(this.roleId);
        const roleName = role ? role.name : "<<N/A>>"; // Si le rôle n'est pas définit on écrit non attribué donc  N/A
        return {
            id: this.id,
            url: this.url,
            channel: channelName,
            role: roleName,
        };
    }
    // Création d'un nouveau flux
    static create(id, url, channelId, roleId) {
        const feed = new Feed();
        feed.id = id;
        feed.url = url;
        feed.channelId = channelId;
        if (roleId)
            feed.roleId = roleId;
        return feed;
    }
}
exports.default = Feed;
