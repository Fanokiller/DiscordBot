declare function forCache(url: string): string;
declare function forDiscord(url: string): string;
declare const _default: {
    forDiscord: typeof forDiscord;
    forCache: typeof forCache;
};
export default _default;
