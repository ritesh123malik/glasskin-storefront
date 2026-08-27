-- Migration: Create products table & seed data for GLASSSKIN storefront

CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price INTEGER NOT NULL, -- Price in INR
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  hover_image TEXT NOT NULL,
  in_stock BOOLEAN NOT NULL DEFAULT true,
  features TEXT[] NOT NULL DEFAULT '{}'::TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Allow public read access for storefront users
CREATE POLICY "Allow public read access on products"
  ON public.products
  FOR SELECT
  TO public
  USING (true);

-- Seed initial product catalog
INSERT INTO public.products (id, name, category, price, description, image, hover_image, in_stock, features)
VALUES
  ('cleanser-1', 'Gentle Rice Bran Cleansing Oil', 'Cleansers', 1899, 'A silky, milky emulsion that dissolves makeup and impurities while retaining moisture.', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1608248597359-00f73b6aa8a8?auto=format&fit=crop&w=800&q=80', true, ARRAY['Deeply cleanses', 'pH balanced', 'Restores lipid barrier']),
  ('cleanser-2', 'Hydrating Oat Gel Cleanser', 'Cleansers', 1299, 'A soothing, non-foaming cleanser that leaves skin clean, hydrated, and calm.', 'https://images.unsplash.com/photo-1556228722-d9b3be313c07?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80', true, ARRAY['Hypoallergenic', 'Soothing oat extract', 'Daily use']),
  ('serum-1', 'Glass Skin Glaze Serum', 'Serums', 2499, 'Our signature nectar infused with 5% niacinamide, peptide complexes, and hyaluronic acid.', 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80', true, ARRAY['Intense radiance', 'Fades dark spots', 'Plumps skin texture']),
  ('serum-2', 'Copper Peptide Recovery Elixir', 'Serums', 2999, 'A fast-absorbing recovery concentrate to smooth lines and accelerate cell turnover.', 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80', false, ARRAY['Anti-aging', 'Boosts collagen', 'Calms redness']),
  ('moisturizer-1', 'Ceramide Barrier Melting Cream', 'Moisturizers', 2199, 'A rich, whipped moisturizing souffle that absorbs instantly to lock in hydration.', 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80', true, ARRAY['Locks moisture for 24h', '5 core ceramides', 'Non-comedogenic']),
  ('moisturizer-2', 'Intense Lipid Souffle Cream', 'Moisturizers', 2599, 'An ultra-nourishing lipid cream for dry or depleted skin barriers needing critical repair.', 'https://images.unsplash.com/photo-1567928805192-d35d641494b8?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1512290900672-1f4001c34a9b?auto=format&fit=crop&w=800&q=80', true, ARRAY['Golden ratio lipids', 'Instant barrier relief', 'Deep rich hydration']),
  ('spf-1', 'Invisible Dew SPF 50+ Sunscreen', 'SPF', 1699, 'A weightless broad-spectrum fluid that leaves a velvety dewy finish with zero white cast.', 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80', true, ARRAY['Broad spectrum protection', 'Hyaluronic acid base', 'Vitamins C & E']),
  ('spf-2', 'Mattifying Mineral SPF 30 Sunscreen', 'SPF', 1599, 'A lightweight, zinc-based physical sunscreen that controls shine and provides a soft matte finish.', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80', false, ARRAY['100% mineral shield', 'Oil control', 'Reduces redness']),
  ('gift-set-1', 'The Glass Skin Ritual Trio', 'Gift Sets', 4999, 'A curated three-step system (Cleansing Oil, Glaze Serum, Barrier Cream) for maximum radiance.', 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1512290903422-9218d6e326aa?auto=format&fit=crop&w=800&q=80', true, ARRAY['Complete morning ritual', 'Gift-ready box', 'Saves 20% compared to singles']),
  ('toner-1', 'Milky Rice Hydrating Toner', 'Toners', 1499, 'A dual-layer softening water that preps skin for treatments while delivering deep, direct hydration.', 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80', true, ARRAY['Preps skin', 'Deep hydration', 'Rice water base'])
ON CONFLICT (id) DO NOTHING;
