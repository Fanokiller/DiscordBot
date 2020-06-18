"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const disharmony_1 = require("disharmony");
const HtmlToText = require("html-to-text");
const overallCharacterLimit = 750;
const articleFormattingShort = "\n{{article}}";
const articleFormattingLong = "\n{{article}}...";
const articleContentCharacterLimit = 250;

// Affichage des articles

class ArticlePoster {
    async postArticle(guild, channelId, article, roleId) {
        const channel = guild.channels.get(channelId);
        const message = this.formatPost(article);
        try {
            await channel.send((roleId ? `<@&${roleId}>` : "") + message);
        }
        catch (e) {
            disharmony_1.Logger.debugLogError(`Erreur lors de la publication de l'article dans la chaîne ${channel.name} en accord avec ${channel.guild.name}`, e);
        }
    }

    // Formate la publication du message
    formatPost(article) {
        const title = article.title ? `\n**${article.title}**` : "";
        const link = article.link ? `\n${article.link}` : "";
        let message = title;
        if (article.content) {
            let articleString = HtmlToText.fromString(article.content);
            const isTooLong = articleString.length > articleContentCharacterLimit;
            articleString = isTooLong ? articleString.substr(0, articleContentCharacterLimit) : articleString;
            message += (isTooLong ? articleFormattingLong : articleFormattingShort).replace("{{article}}", articleString);
        }
        message += link.length <= overallCharacterLimit ? link : link.substr(0, overallCharacterLimit);
        return message;
    }
}
exports.default = ArticlePoster;
