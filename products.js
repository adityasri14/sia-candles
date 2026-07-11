// ---------------------------------------------------------
// PRODUCT CATALOG — this is the only file you need to edit
// to add, remove, or update candles.
//
// Fields:
//   name        - candle name, shown as the title
//   scent       - short scent description
//   price       - number, in rupees (no currency symbol, no commas)
//   image       - path to a photo, e.g. "images/hero-1.jpg".
//                 Leave as "" if you don't have a photo yet —
//                 it'll show a plain placeholder instead.
//   bestseller  - true/false, shows a "Bestseller" tag and
//                 includes it in the featured row up top
// ---------------------------------------------------------

const products = [
  { name: "Rose Petrichor",  scent: "Rose, damp earth, cedar",      price: 549, image: "images/hero-1.jpg", bestseller: true },
  { name: "Amber Dusk",      scent: "Amber, sandalwood, vanilla",   price: 499, image: "images/hero-3.jpg", bestseller: true },
  { name: "Citrus Grove",    scent: "Orange peel, bergamot, mint",  price: 449, image: "images/hero-2.jpg", bestseller: false },
  { name: "Midnight Fig",    scent: "Fig, oud, dark musk",          price: 599, image: "", bestseller: false },
  { name: "Lavender Fields", scent: "Lavender, chamomile, oatmilk", price: 449, image: "", bestseller: false },
  { name: "Spiced Chai",     scent: "Cinnamon, clove, cardamom",    price: 499, image: "", bestseller: false },
];

// Business contact info — all in one place.
const businessInfo = {
  whatsappNumber: "919673908048", // replace with your real number: countrycode + number, no + or spaces
  email: "hello@siascentedcandle.com",
  domain: "siascentedcandle.com",
  instagramHandle: "sia_scentedcandles",
  instagramUrl: "https://instagram.com/sia_scentedcandles",
};
