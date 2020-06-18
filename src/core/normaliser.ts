import { parse } from "url"

function forCache(url: string): string
{
    return forDiscord(url).replace(/^((https?:\/\/)?(www.)?)/, "")
}

function forDiscord(url: string): string
{
    return convertYouTubeUrl(url)
}

function convertYouTubeUrl(url: string): string
{
    const parsedUrl = parse(url)

    // Convertissez les URL youtube.com en URL youtu.be
    if (parsedUrl.host && parsedUrl.host.includes("youtube.com"))
    {
        const videoIdParam = parsedUrl.query ? parsedUrl.query.split("&").find(x => x.startsWith("v=")) : null
        if (videoIdParam)
        {
            const videoId = videoIdParam.substring(videoIdParam.indexOf("=") + 1, videoIdParam.length)
            return `https://youtu.be/${videoId}`
        }
    }
    return url
}

export default {
    forDiscord,
    forCache,
}