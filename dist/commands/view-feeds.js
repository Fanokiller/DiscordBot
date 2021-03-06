"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const disharmony_1 = require("disharmony");
const paginationLimit = 5;
async function invoke(params, message) {
    if (message.guild.feeds.length === 0)
        return "Aucun fil n'est configurer sur ce serveur";
    let startIdx = 0;
    if (params[0]) {
        const maybeStartIdx = Number(params[0]);
        if (!isNaN(maybeStartIdx))
            startIdx = (maybeStartIdx - 1) * paginationLimit;
    }
    const endIdx = startIdx + paginationLimit;
    let responseStr = message.guild.feeds.slice(startIdx, endIdx).map(f => stringifyFeed(f, message.guild)).join("\n");
    if (message.guild.feeds.length > endIdx)
        responseStr += `Utiliser *voir-feeds ${startIdx + 2}* pour en voir plus`;
    return responseStr || "Aucun fil configuré";
}
exports.default = new disharmony_1.Command(
/*syntax*/ "voir-feeds", 
/*description*/ "Affiche les fils RSS configuré sur ce serveur", 
/*permissionLevel*/ disharmony_1.PermissionLevel.Admin, 
/*invoke*/ invoke);
function stringifyFeed(feed, guild) {
    return `\`\`\`JavaScript\n ${JSON.stringify(feed.toFriendlyObject(guild), null, "\t")} \`\`\``;
}
