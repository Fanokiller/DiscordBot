"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const disharmony_1 = require("disharmony");
const guild_1 = require("./guild");
class Message extends disharmony_1.DisharmonyMessage {
    constructor(djsMessage) {
        super(djsMessage);
        this.guild = new guild_1.default(djsMessage.guild);
    }
}
exports.default = Message;
