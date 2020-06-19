"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const disharmony_1 = require("disharmony");
async function invoke(params, message) {
    const filtered = message.guild.feeds.filter(x => x.id !== params[0]);
    if (filtered.length === message.guild.feeds.length)
        throw new Error("Je ne trouve pas le fil avec cet id " + params[0]);
    message.guild.feeds = filtered;
    return "Fil retiré !";
}
exports.default = new disharmony_1.Command(
/*syntax*/ "stop-feed <id>", 
/*description*/ "Retirer un fil RSS avec son id", 
/*permissionLevel*/ disharmony_1.PermissionLevel.Admin, 
/*invoke*/ invoke);
