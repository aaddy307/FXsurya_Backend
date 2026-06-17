function detectPlatform(url) {
  if (!url) return "other";
  if (url.includes("instagram.com")) return "instagram";
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
  if (url.includes("twitter.com") || url.includes("x.com")) return "twitter";
  return "other";
}

export default detectPlatform;
