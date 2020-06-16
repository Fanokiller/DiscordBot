"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");

// Transcription des URL HTML en URL Commande
function forCache(url) {
    return forDiscord(url).replace(/^((https?:\/\/)?(www.)?)/, "");
}
// Conversion de Youtube sur Discord
function forDiscord(url) {
    return convertYouTubeUrl(url);
}
//Analyse de l'URL pour la conversion de Youtube
function convertYouTubeUrl(url) {
    const parsedUrl = url_1.parse(url);

    // Conversion des URL de youtube.com en URL de youtu.be
    if (parsedUrl.host && parsedUrl.host.includes("youtube.com")) {
        const videoIdParam = parsedUrl.query ? parsedUrl.query.split("&").find(x => x.startsWith("v=")) : null;
        if (videoIdParam) {
            const videoId = videoIdParam.substring(videoIdParam.indexOf("=") + 1, videoIdParam.length);
            return `https://youtu.be/${videoId}`;
        }
    }
    return url;
}
exports.default = {
    forDiscord,
    forCache,
};
