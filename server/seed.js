const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const products = [
  // Rajasthan
  {
    name: "Makrana White Marble",
    region: "rajasthan",
    color: "Milky White",
    price: 185,
    finish: "Polished",
    thickness: "18–20 mm",
    minQty: 100,
    image:
      "https://www.stoneadd.com/photo/marble/italy/Bianco-Carrara-White-Marble-Italy-White-Marble-Colors.jpg",
    features: [
      "Premium white tone",
      "Natural grey veins",
      "Low water absorption",
      "Ideal for luxury flooring",
    ],
  },
  {
    name: "Rajnagar White Marble",
    region: "rajasthan",
    color: "White & Grey",
    price: 155,
    finish: "Glossy",
    thickness: "18–20 mm",
    minQty: 100,
    image:
      "https://www.stoneadd.com/photo/marble/italy/Bianco-Carrara-White-Marble-Italy-White-Marble-Colors.jpg",
    features: [
      "Soft grey patterns",
      "Bright appearance",
      "Easy maintenance",
      "Good for walls and flooring",
    ],
  },
  {
    name: "Morwad Marble",
    region: "rajasthan",
    color: "White",
    price: 165,
    finish: "Polished",
    thickness: "18 mm",
    minQty: 100,
    image:
      "https://www.stoneadd.com/photo/marble/italy/Bianco-Carrara-White-Marble-Italy-White-Marble-Colors.jpg",
    features: [
      "Smooth surface",
      "Subtle veins",
      "Durable natural stone",
      "Suitable for residential projects",
    ],
  },
  {
    name: "Banswara White Marble",
    region: "rajasthan",
    color: "White & Light Grey",
    price: 175,
    finish: "Polished",
    thickness: "18–20 mm",
    minQty: 100,
    image:
      "https://www.stoneadd.com/photo/marble/italy/Bianco-Carrara-White-Marble-Italy-White-Marble-Colors.jpg",
    features: [
      "Elegant light tone",
      "Fine natural texture",
      "Strong finish",
      "Premium interior use",
    ],
  },

  // Gujarat
  {
    name: "Ambaji White Marble",
    region: "gujarat",
    color: "Pure White",
    price: 190,
    finish: "Polished",
    thickness: "18–20 mm",
    minQty: 100,
    image:
      "https://www.stoneadd.com/photo/marble/italy/Bianco-Carrara-White-Marble-Italy-White-Marble-Colors.jpg",
    features: [
      "Bright white surface",
      "Smooth polishing",
      "Strong appearance",
      "Suitable for premium flooring",
    ],
  },
  {
    name: "Gujarat Beige Marble",
    region: "gujarat",
    color: "Warm Beige",
    price: 145,
    finish: "Honed",
    thickness: "18 mm",
    minQty: 100,
    image:
      "https://www.stoneadd.com/photo/marble/turkey/Spider-Beige-Marble-Colors-Polished.jpg",
    features: [
      "Warm neutral shade",
      "Natural texture",
      "Modern look",
      "Suitable for offices and homes",
    ],
  },
  {
    name: "Pearl Cream Marble",
    region: "gujarat",
    color: "Cream",
    price: 160,
    finish: "Polished",
    thickness: "18–20 mm",
    minQty: 100,
    image:
      "https://antalyamarble.com/upload/urunler/_1f57c61e0b.jpg.webp",
    features: [
      "Soft cream tone",
      "Fine surface",
      "Easy to pair with interiors",
      "Elegant wall cladding",
    ],
  },
  {
    name: "Golden Beige Marble",
    region: "gujarat",
    color: "Beige & Gold",
    price: 175,
    finish: "Glossy",
    thickness: "20 mm",
    minQty: 100,
    image:
      "https://www.stoneadd.com/photo/marble/turkey/Spider-Beige-Marble-Colors-Polished.jpg",
    features: [
      "Golden undertone",
      "Decorative pattern",
      "Premium glossy look",
      "Suitable for feature areas",
    ],
  },

  // Andhra Pradesh
  {
    name: "Black Galaxy Stone",
    region: "andhra-pradesh",
    color: "Deep Black",
    price: 210,
    finish: "Mirror Polish",
    thickness: "18–20 mm",
    minQty: 100,
    image:
      "https://cdn.msisurfaces.com/images/colornames/gradient/fantasy-black-marble.jpg",
    features: [
      "Deep black base",
      "Premium glossy surface",
      "Strong visual contrast",
      "Ideal for counters and flooring",
    ],
  },
  {
    name: "Absolute Black Stone",
    region: "andhra-pradesh",
    color: "Jet Black",
    price: 195,
    finish: "Polished",
    thickness: "18 mm",
    minQty: 100,
    image:
      "https://cdn.msisurfaces.com/images/colornames/gradient/fantasy-black-marble.jpg",
    features: [
      "Uniform dark tone",
      "Clean luxury look",
      "Easy styling",
      "Good for modern spaces",
    ],
  },
  {
    name: "Silver Black Marble",
    region: "andhra-pradesh",
    color: "Black & Silver",
    price: 180,
    finish: "Glossy",
    thickness: "18–20 mm",
    minQty: 100,
    image:
      "https://cdn.msisurfaces.com/images/colornames/gradient/fantasy-black-marble.jpg",
    features: [
      "Silver vein effect",
      "Bold natural pattern",
      "Decorative finish",
      "Good for feature walls",
    ],
  },
  {
    name: "Midnight Black Marble",
    region: "andhra-pradesh",
    color: "Black",
    price: 170,
    finish: "Honed",
    thickness: "18 mm",
    minQty: 100,
    image:
      "https://cdn.msisurfaces.com/images/colornames/gradient/fantasy-black-marble.jpg",
    features: [
      "Soft matte appearance",
      "Dark natural tone",
      "Contemporary look",
      "Suitable for indoor projects",
    ],
  },

  // Tamil Nadu
  {
    name: "Tamil Cream Marble",
    region: "tamil-nadu",
    color: "Cream",
    price: 150,
    finish: "Polished",
    thickness: "18 mm",
    minQty: 100,
    image:
      "https://antalyamarble.com/upload/urunler/_1f57c61e0b.jpg.webp",
    features: [
      "Soft cream finish",
      "Warm natural shade",
      "Smooth polish",
      "Suitable for homes",
    ],
  },
  {
    name: "Temple Beige Marble",
    region: "tamil-nadu",
    color: "Beige",
    price: 140,
    finish: "Honed",
    thickness: "18–20 mm",
    minQty: 100,
    image:
      "https://www.stoneadd.com/photo/marble/turkey/Spider-Beige-Marble-Colors-Polished.jpg",
    features: [
      "Natural beige texture",
      "Subtle pattern",
      "Traditional appearance",
      "Good for large floors",
    ],
  },
  {
    name: "Classic White Marble",
    region: "tamil-nadu",
    color: "White",
    price: 170,
    finish: "Polished",
    thickness: "18 mm",
    minQty: 100,
    image:
      "https://www.stoneadd.com/photo/marble/italy/Bianco-Carrara-White-Marble-Italy-White-Marble-Colors.jpg",
    features: [
      "Clean white tone",
      "Fine veining",
      "Bright interiors",
      "Suitable for walls and floors",
    ],
  },
  {
    name: "Southern Pearl Marble",
    region: "tamil-nadu",
    color: "Pearl Cream",
    price: 165,
    finish: "Glossy",
    thickness: "20 mm",
    minQty: 100,
    image:
      "https://antalyamarble.com/upload/urunler/_1f57c61e0b.jpg.webp",
    features: [
      "Pearl-like tone",
      "Refined finish",
      "Modern premium look",
      "Ideal for indoor applications",
    ],
  },

  // Karnataka
  {
    name: "Karnataka Beige Marble",
    region: "karnataka",
    color: "Natural Beige",
    price: 145,
    finish: "Polished",
    thickness: "18 mm",
    minQty: 100,
    image:
      "https://www.stoneadd.com/photo/marble/turkey/Spider-Beige-Marble-Colors-Polished.jpg",
    features: [
      "Natural beige look",
      "Balanced texture",
      "Low-maintenance surface",
      "Suitable for commercial use",
    ],
  },
  {
    name: "Ivory Cream Marble",
    region: "karnataka",
    color: "Ivory",
    price: 155,
    finish: "Honed",
    thickness: "18–20 mm",
    minQty: 100,
    image:
      "https://antalyamarble.com/upload/urunler/_1f57c61e0b.jpg.webp",
    features: [
      "Soft ivory shade",
      "Calm natural texture",
      "Elegant matte finish",
      "Good for living spaces",
    ],
  },
  {
    name: "Classic Black Marble",
    region: "karnataka",
    color: "Black",
    price: 185,
    finish: "Polished",
    thickness: "18 mm",
    minQty: 100,
    image:
      "https://cdn.msisurfaces.com/images/colornames/gradient/fantasy-black-marble.jpg",
    features: [
      "Bold black tone",
      "Premium polish",
      "Strong contrast",
      "Good for counters and accents",
    ],
  },
  {
    name: "Cloud White Marble",
    region: "karnataka",
    color: "White & Grey",
    price: 175,
    finish: "Glossy",
    thickness: "20 mm",
    minQty: 100,
    image:
      "https://www.stoneadd.com/photo/marble/italy/Bianco-Carrara-White-Marble-Italy-White-Marble-Colors.jpg",
    features: [
      "Cloud-like pattern",
      "Bright surface",
      "Decorative appeal",
      "Suitable for premium interiors",
    ],
  },

  // Madhya Pradesh
  {
    name: "MP White Marble",
    region: "madhya-pradesh",
    color: "White",
    price: 150,
    finish: "Polished",
    thickness: "18 mm",
    minQty: 100,
    image:
      "https://www.stoneadd.com/photo/marble/italy/Bianco-Carrara-White-Marble-Italy-White-Marble-Colors.jpg",
    features: [
      "Clean white surface",
      "Simple natural veins",
      "Versatile design",
      "Suitable for large projects",
    ],
  },
  {
    name: "MP Beige Marble",
    region: "madhya-pradesh",
    color: "Beige",
    price: 135,
    finish: "Honed",
    thickness: "18–20 mm",
    minQty: 100,
    image:
      "https://www.stoneadd.com/photo/marble/turkey/Spider-Beige-Marble-Colors-Polished.jpg",
    features: [
      "Warm beige shade",
      "Natural matte look",
      "Budget-friendly style",
      "Good for flooring",
    ],
  },
  {
    name: "Central India Cream Marble",
    region: "madhya-pradesh",
    color: "Cream",
    price: 145,
    finish: "Polished",
    thickness: "18 mm",
    minQty: 100,
    image:
      "https://antalyamarble.com/upload/urunler/_1f57c61e0b.jpg.webp",
    features: [
      "Soft cream shade",
      "Smooth surface",
      "Neutral styling",
      "Suitable for homes and offices",
    ],
  },
  {
    name: "Central Black Marble",
    region: "madhya-pradesh",
    color: "Black & Grey",
    price: 165,
    finish: "Glossy",
    thickness: "20 mm",
    minQty: 100,
    image:
      "https://cdn.msisurfaces.com/images/colornames/gradient/fantasy-black-marble.jpg",
    features: [
      "Dark luxury tone",
      "Natural vein pattern",
      "Glossy finish",
      "Good for feature spaces",
    ],
  },
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected for seeding");

    await Product.deleteMany();

    console.log("Old products removed");

    await Product.insertMany(products);

    console.log(`${products.length} products inserted successfully`);

    await mongoose.connection.close();

    console.log("MongoDB connection closed");

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);

    process.exit(1);
  }
}

seedProducts();