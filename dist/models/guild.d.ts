import { DisharmonyGuild } from "disharmony";
import Feed from "./feed";
export default class Guild extends DisharmonyGuild {
    private _feeds;
    feeds: Feed[];
    readonly channels: import("discord.js").Collection<string, import("discord.js").GuildChannel>;
    loadRecord(record: any): void;
    private createFeedsBacking;
}
