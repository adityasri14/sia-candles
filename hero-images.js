// ---------------------------------------------------------
// HERO BACKGROUND IMAGES — the 3 (or more) photos that
// crossfade behind the hero headline.
//
// Add direct image URLs here. Upload photos to imgur.com
// (or similar) and paste the "direct link" — must end in
// .jpg/.png/.webp etc, not a page URL.
//
// Leave the array empty or with placeholder="" entries and
// the hero will just show the plain background color instead
// of crashing.
// ---------------------------------------------------------

const heroImages = [
  { url: "https://www.pexels.com/photo/serene-candlelight-arrangement-in-dim-setting-29329365/", alt: "Candle photo 1" },
  { url: "https://www.pexels.com/photo/a-white-lighted-candle-in-close-up-photography-7233184/", alt: "Candle photo 2" },
  { url: "https://www.pexels.com/photo/festive-candle-with-christmas-tree-decor-35000890/", alt: "Candle photo 3" },
];

// How long each image stays on screen before crossfading, in milliseconds.
const heroSlideDurationMs = 5000;
