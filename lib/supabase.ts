import { createClient } from "@supabase/supabase-js";
import { Product } from "@/lib/products";

// Fallback to empty string if env vars not provided yet (prevents crash during static build)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export class CatalogUnavailableError extends Error {
  constructor() {
    super("The product catalog is temporarily unavailable. Please try again shortly.");
    this.name = "CatalogUnavailableError";
  }
}

export function isCatalogUnavailableError(error: unknown): error is CatalogUnavailableError {
  return error instanceof CatalogUnavailableError;
}

function allowsDevelopmentFixture(): boolean {
  return process.env.NODE_ENV === "development";
}

/** Fetch all products from Supabase, using fixtures only during local development. */
export async function getProductsFromSupabase(): Promise<Product[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    if (allowsDevelopmentFixture()) return mockProductsFallback;
    throw new CatalogUnavailableError();
  }

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*, product_variants(id, title, price, is_active)")
      .order("id", { ascending: true });

    if (error || !data || data.length === 0) {
      console.warn("Supabase catalog query failed:", error?.message);
      if (allowsDevelopmentFixture()) return mockProductsFallback;
      throw new CatalogUnavailableError();
    }

    return data.map((item) => {
      const variant = (item.product_variants ?? []).find((value: { is_active: boolean }) => value.is_active);
      return {
      id: item.id,
      name: item.name,
      category: item.category,
      price: variant?.price ?? item.price,
      description: item.description,
      image: item.image,
      hoverImage: item.hover_image || item.image,
      inStock: item.in_stock && Boolean(variant),
      features: item.features || [],
      variantId: variant?.id,
      variantTitle: variant?.title,
      avg_rating: item.avg_rating ?? undefined,
      review_count: item.review_count ?? undefined,
    };
    });
  } catch (err) {
    if (isCatalogUnavailableError(err)) throw err;
    console.error("Supabase catalog fetch failed:", err);
    if (allowsDevelopmentFixture()) return mockProductsFallback;
    throw new CatalogUnavailableError();
  }
}

/**
 * Fetch single product by ID from Supabase.
 */
export async function getProductByIdFromSupabase(id: string): Promise<Product | null> {
  const products = await getProductsFromSupabase();
  return products.find((p) => p.id === id) || null;
}

// Local development fixture. It is never returned in production.
const mockProductsFallback: Product[] = [
  {
    id: "cleanser-1",
    name: "Gentle Rice Bran Cleansing Oil",
    category: "Cleansers",
    price: 1899,
    description: "A silky, milky emulsion that dissolves makeup and impurities while retaining moisture.",
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
    image: "https://images.unsplash.com/photo-1556228722-d9b3be313c07?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    features: ["Hypoallergenic", "Soothing oat extract", "Daily use"],
  },
  {
    id: "serum-1",
    name: "Glass Skin Glaze Serum",
    category: "Serums",
    price: 2499,
    description: "Our signature nectar infused with 5% niacinamide, peptide complexes, and hyaluronic acid.",
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
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    inStock: false,
    features: ["Anti-aging", "Boosts collagen", "Calms redness"],
  },
  {
    id: "moisturizer-1",
    name: "Ceramide Barrier Melting Cream",
    category: "Moisturizers",
    price: 2199,
    description: "A rich, whipped moisturizing souffle that absorbs instantly to lock in hydration.",
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
    image: "https://images.unsplash.com/photo-1567928805192-d35d641494b8?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1512290900672-1f4001c34a9b?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    features: ["Golden ratio lipids", "Instant barrier relief", "Deep rich hydration"],
  },
  {
    id: "spf-1",
    name: "Invisible Dew SPF 50+ Sunscreen",
    category: "SPF",
    price: 1699,
    description: "A weightless broad-spectrum fluid that leaves a velvety dewy finish with zero white cast.",
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
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80",
    inStock: false,
    features: ["100% mineral shield", "Oil control", "Reduces redness"],
  },
  {
    id: "gift-set-1",
    name: "The Glass Skin Ritual Trio",
    category: "Gift Sets",
    price: 4999,
    description: "A curated three-step system (Cleansing Oil, Glaze Serum, Barrier Cream) for maximum radiance.",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1512290903422-9218d6e326aa?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    features: ["Complete morning ritual", "Gift-ready box", "Saves 20% compared to singles"],
  },
  {
    id: "toner-1",
    name: "Milky Rice Hydrating Toner",
    category: "Toners",
    price: 1499,
    description: "A dual-layer softening water that preps skin for treatments while delivering deep, direct hydration.",
    image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    features: ["Preps skin", "Deep hydration", "Rice water base"],
  },
];
