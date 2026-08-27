-- 8a: Product compliance fields (ingredients, expiry, certifications)
-- These are informational and must be provided by the brand before launch.
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS ingredients TEXT,
  ADD COLUMN IF NOT EXISTS shelf_life_months INTEGER,
  ADD COLUMN IF NOT EXISTS certifications TEXT[],
  ADD COLUMN IF NOT EXISTS manufacturer TEXT,
  ADD COLUMN IF NOT EXISTS country_of_origin TEXT DEFAULT 'India',
  ADD COLUMN IF NOT EXISTS batch_number TEXT,
  ADD COLUMN IF NOT EXISTS best_before DATE;

COMMENT ON TABLE products IS 'Core product catalogue with compliance fields for Indian cosmetics regulations.';
COMMENT ON COLUMN products.ingredients IS 'INCI ingredient list, required for cosmetics compliance.';
COMMENT ON COLUMN products.shelf_life_months IS 'Shelf life in months from date of manufacture.';
COMMENT ON COLUMN products.certifications IS 'e.g. {Cruelty-Free, Vegan, Paraben-Free, Dermatologically Tested}.';
COMMENT ON COLUMN products.manufacturer IS 'Legal name and address of manufacturer.';
COMMENT ON COLUMN products.country_of_origin IS 'Country where product was manufactured.';
COMMENT ON COLUMN products.batch_number IS 'Production batch/lot number for traceability.';
COMMENT ON COLUMN products.best_before IS 'Expiry date (best before) for the batch.';

-- RLS: products is already readable by anon (published products only).
-- Compliance fields are read-only and visible on published product pages.
-- No additional RLS policies needed; customers read published rows via existing anon select.