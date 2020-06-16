import { NotifyPropertyChanged, SubDocument } from "disharmony";
import Guild from "./guild";
export default class Feed extends SubDocument implements NotifyPropertyChanged {
    private maxHistoryCount;
    private history;
    id: string;
    url: string;
    channelId: string;
    roleId: string;
    isLinkInHistory(link: string): boolean;
    pushHistory(...links: string[]): void;
    toRecord(): {
        id: string;
        url: string;
        channelId: string;
        roleId: string;
        history: string[];
    };
    loadRecord(record: any): void;
    toFriendlyObject(guild: Guild): {
        id: string;
        url: string;
        channel: string;
        role: string;
    };
    static create(id: string, url: string, channelId: string, roleId?: string): Feed;
}
