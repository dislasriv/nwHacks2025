export default function urlProcessor(url) {
    return new URL(url).hostname;
}
