import { Client, Command, CommandRejection, DisharmonyMessage, PermissionLevel, Question } from "disharmony"
import * as ShortId from "shortid"
import * as Url from "url"
import Feed from "../models/feed"
import Message from "../models/message"
import { getRssFetcher } from "../service/rss-reader/abstract/rss-fetcher"

async function invoke(params: string[], message: Message, client: Client)
{
    // Validate and retrieve channel ID
    if (message.mentions.channels.size === 0)
        throw new CommandRejection("Le salons n'est pas valide !")
    const channelId = message.mentions.channels.first().id

    // Validate and retrieve feed URL
    const url = params[0]
    if (!isValid(url))
        throw new CommandRejection("Votre URL n'est pas valide !")

    // Retrieve (optional) roleID
    let roleId = ""
    if (message.mentions.roles.size > 0)
        roleId = message.mentions.roles.first().id

    // Retrieve and validate against existing feeds for this channel
    const feeds = message.guild.feeds.filter(x => x.channelId === channelId)
    if (feeds.find(x => x.url === url))
        throw new CommandRejection("Ce fil existe déjà !")

    // Add new feed
    const newFeed = Feed.create(ShortId.generate(), url, channelId, roleId)

    let prompt = `Cela vous satisfait? (O/N)\n\`\`\`JSON\n${JSON.stringify(newFeed.toFriendlyObject(message.guild), null, "\t")}\`\`\``
    let userResponse: DisharmonyMessage, commandResponse = ""
    while (commandResponse === "")
    {
        // Request confirmation
        const question = new Question(client, message.channelId, prompt, message.member, true)
        userResponse = await question.send()

        if (userResponse.content === "O")
        {
            await message.reply("Patientez, je valide votre fil RSS")

            if (await getRssFetcher().validateFeed(url))
            {
                message.guild.feeds.push(newFeed)
                commandResponse = "C'est tout bon je sauvegarde cela"
            }
            else
                commandResponse = "Ce fil RSS n'est pas valide"
        }
        else if (userResponse.content === "N")
            commandResponse = "Votre fil n'as pas été sauvegardé"
        else
            prompt = "Veuillez entrer **O** or **N** pour Oui ou Non"
    }
    return commandResponse
}

export default new Command(
    /*syntax*/          "ajout-feed <url> <#channel> [@role]",
    /*description*/     "Ajouter un fil RSS dans un salon avec différentes option",
    /*permissionLevel*/ PermissionLevel.Admin,
    /*invoke*/          invoke,
)

function isValid(url: string): boolean
{
    return !!Url.parse(url).hostname
}