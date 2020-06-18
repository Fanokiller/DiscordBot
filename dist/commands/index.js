"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

// Récupération et stockage des fichiers de commande
const add_feed_1 = require("./add-feed");
const remove_feed_1 = require("./remove-feed");
const view_feeds_1 = require("./view-feeds");
exports.default = [
    add_feed_1.default,
    view_feeds_1.default,
    remove_feed_1.default,
];
