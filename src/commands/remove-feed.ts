import { Command, PermissionLevel } from "disharmony"
import Message from "../models/message"

async function invoke(params: string[], message: Message)
{
    const filtered = message.guild.feeds.filter(x => x.id !== params[0])

    if (filtered.length === message.guild.feeds.length)
        throw new Error("Je ne trouve pas le fil avec cet id " + params[0])

    message.guild.feeds = filtered
    return "Fil retiré !"
}

export default new Command(
        /*syntax*/          "stop-feed <id>",
        /*description*/     "Retirer un fil RSS avec son id",
        /*permissionLevel*/ PermissionLevel.Admin,
        /*invoke*/          invoke,
)