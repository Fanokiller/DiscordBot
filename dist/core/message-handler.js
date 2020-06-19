"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getUrls = require("get-urls");
async function handleMessage(message) {
    const urls = getUrls(message.content);
    if (urls.size === 0)
        return;
    await message.guild.loadDocument();
    for (const feed of message.guild.feeds)
        if (feed.channelId === message.channelId)
            feed.pushHistory(...urls);
    await message.guild.save();
}
exports.default = handleMessage;
