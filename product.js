// ---------------------------------------------------------
// PRODUCT CATALOG — this is the only file you need to edit
// to add, remove, or update candles.
//
// Fields:
//   name   - candle name, shown as the title
//   scent  - short scent description
//   price  - number, in rupees (no currency symbol, no commas)
//   image  - direct URL to a photo (upload to imgur.com or similar,
//            then paste the "direct image link" here). Leave as ""
//            if you don't have a photo yet — it'll show a placeholder.
// ---------------------------------------------------------

const products = [
  { name: "Amber Dusk",      scent: "Amber, sandalwood, vanilla",   price: 499, image: "" },
  { name: "Citrus Grove",    scent: "Orange peel, bergamot, mint",  price: 449, image: "" },
  { name: "Rose Petrichor",  scent: "Rose, damp earth, cedar",      price: 549, image: "" },
  { name: "Midnight Fig",    scent: "Fig, oud, dark musk",          price: 599, image: "" },
  { name: "Lavender Fields", scent: "Lavender, chamomile, oatmilk", price: 449, image: "" },
  { name: "Spiced Chai",     scent: "Cinnamon, clove, cardamom",    price: 499, image: "" },
];

// Business contact info — also lives here so it's all in one place.
const businessInfo = {
  whatsappNumber: "919999999999", // replace with your real number: countrycode + number, no + or spaces
  email: "hello@siascentedcandle.com",
  domain: "siascentedcandle.com",
};
