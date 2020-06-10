import { Command, PermissionLevel } from "disharmony"
import Feed from "../models/feed"
import Guild from "../models/guild"
import Message from "../models/message"

const paginationLimit = 5

async function invoke(params: string[], message: Message)
{
    if (message.guild.feeds.length === 0)
        return "Aucun fil n'est configurer sur ce serveur"

    let startIdx = 0
    if (params[0])
    {
        const maybeStartIdx = Number(params[0])
        if (!isNaN(maybeStartIdx))
            startIdx = (maybeStartIdx - 1) * paginationLimit
    }

    const endIdx = startIdx + paginationLimit

    let responseStr = message.guild.feeds.slice(startIdx, endIdx).map(f => stringifyFeed(f, message.guild)).join("\n")
    if (message.guild.feeds.length > endIdx)
        responseStr += `Utiliser *voir-feeds ${startIdx + 2}* pour en voir plus`
    return responseStr || "Aucun fil configuré"
}

export default new Command(
        /*syntax*/          "voir-feeds",
        /*description*/     "Affiche les fils RSS configuré sur ce serveur",
        /*permissionLevel*/ PermissionLevel.Admin,
        /*invoke*/          invoke,
)

function stringifyFeed(feed: Feed, guild: Guild): string
{
    return `\`\`\`JavaScript\n ${JSON.stringify(feed.toFriendlyObject(guild), null, "\t")} \`\`\``
}