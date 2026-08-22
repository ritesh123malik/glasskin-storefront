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
    image: "/images/products/cleanser.svg",
    hoverImage: "/images/products/cleanser_hover.svg",
    inStock: true,
    features: ["Deeply cleanses", "pH balanced", "Restores lipid barrier"],
  },
  {
    id: "cleanser-2",
    name: "Hydrating Oat Gel Cleanser",
    category: "Cleansers",
    price: 1299,
    description: "A soothing, non-foaming cleanser that leaves skin clean, hydrated, and calm.",
    image: "/images/products/cleanser.svg",
    hoverImage: "/images/products/cleanser_hover.svg",
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
    image: "/images/products/serum.svg",
    hoverImage: "/images/products/serum_hover.svg",
    inStock: true,
    features: ["Intense radiance", "Fades dark spots", "Plumps skin texture"],
  },
  {
    id: "serum-2",
    name: "Copper Peptide Recovery Elixir",
    category: "Serums",
    price: 2999,
    description: "A fast-absorbing recovery concentrate to smooth lines and accelerate cell turnover.",
    image: "/images/products/serum.svg",
    hoverImage: "/images/products/serum_hover.svg",
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
    image: "/images/products/moisturizer.svg",
    hoverImage: "/images/products/moisturizer_hover.svg",
    inStock: true,
    features: ["Locks moisture for 24h", "5 core ceramides", "Non-comedogenic"],
  },
  {
    id: "moisturizer-2",
    name: "Intense Lipid Souffle Cream",
    category: "Moisturizers",
    price: 2599,
    description: "An ultra-nourishing lipid cream for dry or depleted skin barriers needing critical repair.",
    image: "/images/products/moisturizer.svg",
    hoverImage: "/images/products/moisturizer_hover.svg",
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
    image: "/images/products/spf.svg",
    hoverImage: "/images/products/spf_hover.svg",
    inStock: true,
    features: ["Broad spectrum protection", "Hyaluronic acid base", "Vitamins C & E"],
  },
  {
    id: "spf-2",
    name: "Mattifying Mineral SPF 30 Sunscreen",
    category: "SPF",
    price: 1599,
    description: "A lightweight, zinc-based physical sunscreen that controls shine and provides a soft matte finish.",
    image: "/images/products/spf.svg",
    hoverImage: "/images/products/spf_hover.svg",
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
    image: "/images/products/giftset.svg",
    hoverImage: "/images/products/giftset_hover.svg",
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
    image: "/images/products/cleanser.svg",
    hoverImage: "/images/products/cleanser_hover.svg",
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
