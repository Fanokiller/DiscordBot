"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
function forCache(url) {
    return forDiscord(url).replace(/^((https?:\/\/)?(www.)?)/, "");
}
function forDiscord(url) {
    return convertYouTubeUrl(url);
}
function convertYouTubeUrl(url) {
    const parsedUrl = url_1.parse(url);
    // Convert youtube.com urls to youtu.be urls, otherwise don't touch it
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
