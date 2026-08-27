-- 10a: Wishlist
CREATE TABLE IF NOT EXISTS wishlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (customer_id, product_id)
);

ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can read own wishlist" ON wishlists
  FOR SELECT USING (auth.uid() = customer_id);

CREATE POLICY "Customers can insert own wishlist" ON wishlists
  FOR INSERT WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Customers can delete own wishlist" ON wishlists
  FOR DELETE USING (auth.uid() = customer_id);

-- 10b: Recently viewed (stored client-side in localStorage, no server table needed)

-- 10c: Size guide content (static, stored in component)

-- 10d: Skin quiz responses (optional, for future analytics)
CREATE TABLE IF NOT EXISTS skin_quiz_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  skin_type TEXT,
  concerns TEXT[],
  routine TEXT,
  recommendations JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE skin_quiz_responses ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a quiz (anonymous or authenticated)
CREATE POLICY "Allow anonymous quiz submissions" ON skin_quiz_responses
  FOR INSERT WITH CHECK (true);

-- Only admins can read quiz responses
CREATE POLICY "Admins can read quiz responses" ON skin_quiz_responses
  FOR SELECT USING (false); -- Service-role only via supabase-admin

COMMENT ON TABLE wishlists IS 'Customer wishlists for saved products.';
COMMENT ON TABLE skin_quiz_responses IS 'Anonymous skin quiz responses for analytics and personalization.';