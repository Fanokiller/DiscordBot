import { Guild as DjsGuild } from "discord.js";
import Guild from "../models/guild";
import RssArticle from "../service/rss-reader/abstract/rss-article";
export default class ArticlePoster {
    postArticle(guild: Guild | DjsGuild, channelId: string, article: RssArticle, roleId: string): Promise<void>;
    private formatPost;
}
