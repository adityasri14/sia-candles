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
   { name: "Midnight Fig",    scent: "Fig, oud, dark musk",          price: 599, image: "images/hero-4.jpeg", bestseller: false },
  { name: "Lavender Fields", scent: "Lavender, chamomile, oatmilk", price: 449, image: "images/hero-5.jpeg", bestseller: false },
  { name: "Glow Candles",     scent: "Cinnamon, clove, cardamom",    price: 499, image: "images/hero-16.png", bestseller: true },
  { name: "Vanilla",     scent: "Vanilla, cardamom",    price: 499, image: "images/hero-13.png", bestseller: false },
    { name: "First rain",     scent: "First Rain",    price: 499, image: "images/hero-18.png", bestseller: false },
   { name: "Jasmine",     scent: "Jasmine",    price: 499, image: "images/hero-19.png", bestseller: false },
  { name: "Japnese cherry",     scent: "Japnese cherry",    price: 499, image: "images/hero-15.png", bestseller: false },
   { name: "Tulip",     scent: "Tube rose",    price: 499, image: "images/hero-14.png", bestseller: false },
  { name: "Teddy",     scent: "Fruity fun",    price: 299, image: "images/hero-12.png", bestseller: false },
];

// Business contact info — all in one place.
const businessInfo = {
  whatsappNumber: "919673908048", // replace with your real number: countrycode + number, no + or spaces
  email: "hello@siascentedcandle.com",
  domain: "siascentedcandle.com",
  instagramHandle: "sia_scentedcandles",
  instagramUrl: "https://instagram.com/sia_scentedcandles",
};
