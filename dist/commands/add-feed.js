"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const disharmony_1 = require("disharmony");
const ShortId = require("shortid");
const Url = require("url");
const feed_1 = require("../models/feed");
const rss_fetcher_1 = require("../service/rss-reader/abstract/rss-fetcher");
async function invoke(params, message, client) {
    // Valider et récupérer l'ID du salon
    if (message.mentions.channels.size === 0)
        throw new disharmony_1.CommandRejection("Le salons n'est pas valide !");
    const channelId = message.mentions.channels.first().id;
    // Valider et récupérer l'URL du flux
    const url = params[0];
    if (!isValid(url))
        throw new disharmony_1.CommandRejection("Votre URL n'est pas valide !");
    // Recuperer (optionnel) l'ID du role
    let roleId = "";
    if (message.mentions.roles.size > 0)
        roleId = message.mentions.roles.first().id;
    // Valider et récupérer par rapport aux flux existants pour ce salon
    const feeds = message.guild.feeds.filter(x => x.channelId === channelId);
    if (feeds.find(x => x.url === url))
        throw new disharmony_1.CommandRejection("Ce fil existe déjà !");
    // Ajouter un nouveau flux
    const newFeed = feed_1.default.create(ShortId.generate(), url, channelId, roleId);
    let prompt = `Cela vous satisfait? (O/N)\n\`\`\`JSON\n${JSON.stringify(newFeed.toFriendlyObject(message.guild), null, "\t")}\`\`\``;
    let userResponse, commandResponse = "";
    while (commandResponse === "") {
        // Requête de confirmation
        const question = new disharmony_1.Question(client, message.channelId, prompt, message.member, true);
        userResponse = await question.send();
        if (userResponse.content === "O") {
            await message.reply("Patientez, je valide votre fil RSS");
            if (await rss_fetcher_1.getRssFetcher().validateFeed(url)) {
                message.guild.feeds.push(newFeed);
                commandResponse = "C'est tout bon je sauvegarde cela";
            }
            else
                commandResponse = "Ce fil RSS n'est pas valide";
        }
        else if (userResponse.content === "N")
            commandResponse = "Votre fil n'as pas été sauvegardé";
        else
            prompt = "Veuillez entrer **O** or **N** pour Oui ou Non";
    }
    return commandResponse;
}
exports.default = new disharmony_1.Command(
/*syntax*/ "ajout-feed <url> <#channel> [@role]", 
/*description*/ "Ajouter un fil RSS dans un salon avec différentes option", 
/*permissionLevel*/ disharmony_1.PermissionLevel.Admin, 
/*invoke*/ invoke);
function isValid(url) {
    return !!Url.parse(url).hostname;
}
