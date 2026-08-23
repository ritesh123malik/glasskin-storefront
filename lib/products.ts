export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  hoverImage: string;
  inStock: boolean;
  features: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  featuredProduct: Product;
  products: Product[];
}

export const mockProducts: Product[] = [
  // Cleansers
  {
    id: "cleanser-1",
    name: "Gentle Rice Bran Cleansing Oil",
    category: "Cleansers",
    price: 1899,
    description: "A silky, milky emulsion that dissolves makeup and impurities while retaining moisture.",
    // TODO: replace with GLASSSKIN's actual product photography
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1608248597359-00f73b6aa8a8?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    features: ["Deeply cleanses", "pH balanced", "Restores lipid barrier"],
  },
  {
    id: "cleanser-2",
    name: "Hydrating Oat Gel Cleanser",
    category: "Cleansers",
    price: 1299,
    description: "A soothing, non-foaming cleanser that leaves skin clean, hydrated, and calm.",
    // TODO: replace with GLASSSKIN's actual product photography
    image: "https://images.unsplash.com/photo-1556228722-d9b3be313c07?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    features: ["Hypoallergenic", "Soothing oat extract", "Daily use"],
  },

  // Serums
  {
    id: "serum-1",
    name: "Glass Skin Glaze Serum",
    category: "Serums",
    price: 2499,
    description: "Our signature nectar infused with 5% niacinamide, peptide complexes, and hyaluronic acid.",
    // TODO: replace with GLASSSKIN's actual product photography
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    features: ["Intense radiance", "Fades dark spots", "Plumps skin texture"],
  },
  {
    id: "serum-2",
    name: "Copper Peptide Recovery Elixir",
    category: "Serums",
    price: 2999,
    description: "A fast-absorbing recovery concentrate to smooth lines and accelerate cell turnover.",
    // TODO: replace with GLASSSKIN's actual product photography
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    inStock: false,
    features: ["Anti-aging", "Boosts collagen", "Calms redness"],
  },

  // Moisturizers
  {
    id: "moisturizer-1",
    name: "Ceramide Barrier Melting Cream",
    category: "Moisturizers",
    price: 2199,
    description: "A rich, whipped moisturizing souffle that absorbs instantly to lock in hydration.",
    // TODO: replace with GLASSSKIN's actual product photography
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    features: ["Locks moisture for 24h", "5 core ceramides", "Non-comedogenic"],
  },
  {
    id: "moisturizer-2",
    name: "Intense Lipid Souffle Cream",
    category: "Moisturizers",
    price: 2599,
    description: "An ultra-nourishing lipid cream for dry or depleted skin barriers needing critical repair.",
    // TODO: replace with GLASSSKIN's actual product photography
    image: "https://images.unsplash.com/photo-1567928805192-d35d641494b8?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1512290900672-1f4001c34a9b?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    features: ["Golden ratio lipids", "Instant barrier relief", "Deep rich hydration"],
  },

  // SPF
  {
    id: "spf-1",
    name: "Invisible Dew SPF 50+ Sunscreen",
    category: "SPF",
    price: 1699,
    description: "A weightless broad-spectrum fluid that leaves a velvety dewy finish with zero white cast.",
    // TODO: replace with GLASSSKIN's actual product photography
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    features: ["Broad spectrum protection", "Hyaluronic acid base", "Vitamins C & E"],
  },
  {
    id: "spf-2",
    name: "Mattifying Mineral SPF 30 Sunscreen",
    category: "SPF",
    price: 1599,
    description: "A lightweight, zinc-based physical sunscreen that controls shine and provides a soft matte finish.",
    // TODO: replace with GLASSSKIN's actual product photography
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80",
    inStock: false,
    features: ["100% mineral shield", "Oil control", "Reduces redness"],
  },

  // Gift Sets
  {
    id: "gift-set-1",
    name: "The Glass Skin Ritual Trio",
    category: "Gift Sets",
    price: 4999,
    description: "A curated three-step system (Cleansing Oil, Glaze Serum, Barrier Cream) for maximum radiance.",
    // TODO: replace with GLASSSKIN's actual product photography
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1512290903422-9218d6e326aa?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    features: ["Complete morning ritual", "Gift-ready box", "Saves 20% compared to singles"],
  },
  
  // Toners
  {
    id: "toner-1",
    name: "Milky Rice Hydrating Toner",
    category: "Toners",
    price: 1499,
    description: "A dual-layer softening water that preps skin for treatments while delivering deep, direct hydration.",
    // TODO: replace with GLASSSKIN's actual product photography
    image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    features: ["Preps skin", "Deep hydration", "Rice water base"],
  }
];

export const mockCategories: Category[] = [
  {
    id: "cleansers",
    name: "Cleansers",
    description: "Purify without stripping.",
    featuredProduct: mockProducts[0],
    products: mockProducts.filter((p) => p.category === "Cleansers"),
  },
  {
    id: "serums",
    name: "Serums",
    description: "Targeted, high-potency treatments.",
    featuredProduct: mockProducts[2],
    products: mockProducts.filter((p) => p.category === "Serums"),
  },
  {
    id: "moisturizers",
    name: "Moisturizers",
    description: "Deep, long-lasting hydration.",
    featuredProduct: mockProducts[4],
    products: mockProducts.filter((p) => p.category === "Moisturizers"),
  },
  {
    id: "spf",
    name: "SPF",
    description: "Daily defense against UV rays.",
    featuredProduct: mockProducts[6],
    products: mockProducts.filter((p) => p.category === "SPF"),
  },
  {
    id: "gift-sets",
    name: "Gift Sets",
    description: "Curated rituals for yourself or others.",
    featuredProduct: mockProducts[8],
    products: mockProducts.filter((p) => p.category === "Gift Sets"),
  },
];
