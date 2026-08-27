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
  /** The selected/default sellable variant. Product IDs are not checkout IDs. */
  variantId?: string;
  variantTitle?: string;
  /** Denormalised review stats — populated by trigger after reviews are approved. */
  avg_rating?: number;
  review_count?: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  featuredProduct?: Product;
  products?: Product[];
}

// Category structure helper (without hardcoding product data arrays)
export const mockCategories: Omit<Category, 'featuredProduct' | 'products'>[] = [
  {
    id: "cleansers",
    name: "Cleansers",
    description: "Purify without stripping.",
  },
  {
    id: "serums",
    name: "Serums",
    description: "Targeted, high-potency treatments.",
  },
  {
    id: "moisturizers",
    name: "Moisturizers",
    description: "Deep, long-lasting hydration.",
  },
  {
    id: "spf",
    name: "SPF",
    description: "Daily defense against UV rays.",
  },
  {
    id: "gift-sets",
    name: "Gift Sets",
    description: "Curated rituals for yourself or others.",
  },
];
