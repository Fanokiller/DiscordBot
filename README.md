##Auteurs : 
- CARRERE Ludovic
- ISIK Hülya

# Les flux rss dans un bot discord 
Mise en place d'un robot Discord pour publier les derniers articles d'un flux RSS dans une chaîne, mentionnant éventuellement un rôle lors de la publication.
## Caratéristiques 
- Plusieurs flux par channel 
- Commandes pour configurer les flux dans différents canaux
- Rôle facultatif à mentionner lors de la publication d'un article de flux
- Gestion spécifique des liens YouTube et Twitter, détecte les URL YouTube longues et courtes
## Cas d'utilisation 
- Vous voulez rester à jour avec un flux RSS
- Vous souhaitez que votre serveur Discord soit informé des événements via un flux RSS

## Pour commencer
RssHubeee doit être déployé avant de pouvoir l'inviter sur votre serveur Discord
Une fois que vous avez déployé RssHubeee, revenez ici pour suivre les instructions de configuration de Discord ci-dessous. 

## Configuration du serveur Discord 

Suivez ces instructions une fois que vous avez déployé le récupérateur RSS et que vous l'avez ajouté à votre serveur Discord.
Utilisez `l'aide de @RssHubeee` pour afficher les commandes disponibles.

**Permission de l'administrateur**
Les commandes qui requiere les permissions admin sur le serveur discord.
- `@RssHubeee ajout-feed <url> <#salon> [@role]` pour l'ajout d'un nouveau flux 
- `@RssHubeee voir-feeds` pour afficher les flux configurés pour ce serveur
- `@RssHubeee stop-feed <feed-id>` supprimer un flux par son ID (trouvé en utilisant la commande `voir-feeds`)

Example:
`@RssHubeee ajout-feed http://lorem-rss.herokuapp.com/feed?unit=second&interval=30 #information @Locataire`

## Permissions
Le bot nécessite certaines autorisations, qui vous sont demandées sur l'écran d'invitation.
Chaque autorisation a une raison d'être requise, expliquée ci-dessous.

| Permission                     | Raison                                                                                      |
|--------------------------------|---------------------------------------------------------------------------------------------|
| Lire un message                | Detecte quand on utilise la commande                                                        |
| Envoyer un message             | Répond quand on utilise une commande; post publi des nouveaux lien RSS                      |
| Lire l'historique des messages | Vérifiez si de nouveaux liens RSS ont été publiés pendant les temps d'arrêt                 |
| Intégrer des liens             | Les réponses aux demandes d'aide utilisent des messages intégrés pour un formatage agréable |

## Dépendances 
- [Node.js](https://nodejs.org/en/) - *execution*
- [discord.js](https://github.com/discordjs/discord.js) - *Librairie de Discord*
- [disharmony](https://github.com/benji7425/disharmony) - *Bot framework*
- [rss-parser](https://github.com/bobby-brennan/rss-parser) - *Bibliothèque d'analyse Rss*

## License
Ce projet est sous licence MIT - voir le fichier [LICENSE] (./ LICENSE) pour plus de détails
"# DiscordBot" 
"# DiscordBot" 
"# DiscordBot" 
