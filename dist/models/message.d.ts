import { Message as DjsMessage } from "discord.js";
import { DisharmonyMessage } from "disharmony";
import Guild from "./guild";
export default class Message extends DisharmonyMessage {
    readonly guild: Guild;
    constructor(djsMessage: DjsMessage);
}
