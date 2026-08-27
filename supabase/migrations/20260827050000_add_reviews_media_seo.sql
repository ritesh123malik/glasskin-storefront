-- 9a: Reviews with moderation
CREATE TABLE IF NOT EXISTS product_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  order_item_id UUID REFERENCES order_items(id) ON DELETE SET NULL,
  rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title TEXT,
  body TEXT,
  is_verified_purchase BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_product_reviews_product ON product_reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_approved ON product_reviews(is_approved);
ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;

-- Public can read approved reviews
CREATE POLICY "Public read approved reviews" ON product_reviews
  FOR SELECT USING (is_approved = true);

-- Customers can insert their own reviews
CREATE POLICY "Customers can insert own reviews" ON product_reviews
  FOR INSERT WITH CHECK (
    auth.uid() = customer_id
    OR customer_id IS NULL
  );

-- Customers can update their own reviews
CREATE POLICY "Customers can update own reviews" ON product_reviews
  FOR UPDATE USING (auth.uid() = customer_id);

-- Customers can delete their own reviews
CREATE POLICY "Customers can delete own reviews" ON product_reviews
  FOR DELETE USING (auth.uid() = customer_id);

-- Admin service-role can manage all reviews (via supabase-admin client)

COMMENT ON TABLE product_reviews IS 'Customer product reviews with moderation workflow.';
COMMENT ON COLUMN product_reviews.is_verified_purchase IS 'True if reviewer has a matching delivered order for this product.';
COMMENT ON COLUMN product_reviews.is_approved IS 'Admin-approved reviews are visible publicly.';
COMMENT ON COLUMN product_reviews.helpful_count IS 'Number of customers who marked this review as helpful.';

-- 9b: Review helpfulness votes (prevent duplicate votes)
CREATE TABLE IF NOT EXISTS review_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID NOT NULL REFERENCES product_reviews(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  is_helpful BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (review_id, customer_id)
);

ALTER TABLE review_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can insert own vote" ON review_votes
  FOR INSERT WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Customers can read votes" ON review_votes
  FOR SELECT USING (true);

CREATE POLICY "Customers can update own vote" ON review_votes
  FOR UPDATE USING (auth.uid() = customer_id);

CREATE POLICY "Customers can delete own vote" ON review_votes
  FOR DELETE USING (auth.uid() = customer_id);

-- 9c: Product media (additional images/videos per product)
CREATE TABLE IF NOT EXISTS product_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE product_media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read product media" ON product_media
  FOR SELECT USING (true);

-- Admin service-role can manage all media (via supabase-admin client)

COMMENT ON TABLE product_media IS 'Additional product images and videos beyond the primary product.image field.';
COMMENT ON COLUMN product_media.is_primary IS 'If true, this is the main product image (mirrors products.image).';

-- 9d: Add average rating columns to products (denormalised for performance)
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS avg_rating NUMERIC(2,1) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS review_count INTEGER DEFAULT 0;

-- RPC to recompute avg rating after review insert/update/delete
CREATE OR REPLACE FUNCTION update_product_review_stats(p_product_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE products SET
    avg_rating = COALESCE((SELECT ROUND(AVG(rating)::numeric, 1) FROM product_reviews WHERE product_id = p_product_id AND is_approved = true), 0),
    review_count = (SELECT COUNT(*)::integer FROM product_reviews WHERE product_id = p_product_id AND is_approved = true)
  WHERE id = p_product_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: auto-update product stats when a review is approved/changed
CREATE OR REPLACE FUNCTION trg_update_review_stats()
RETURNS trigger AS $$
BEGIN
  PERFORM update_product_review_stats(COALESCE(NEW.product_id, OLD.product_id));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_review_stats
  AFTER INSERT OR UPDATE OR DELETE ON product_reviews
  FOR EACH ROW EXECUTE FUNCTION trg_update_review_stats();