-- Local development seed. Run with `supabase db reset` after applying migrations.

INSERT INTO public.product_variants (product_id, sku, title, option_values, price, currency)
VALUES
  ('cleanser-1', 'GSK-CLN-OIL-100', '100 ml', '{"size":"100 ml"}', 1899, 'INR'),
  ('serum-1', 'GSK-SRM-GLAZE-30', '30 ml', '{"size":"30 ml"}', 2499, 'INR'),
  ('moisturizer-1', 'GSK-MOI-CER-50', '50 g', '{"size":"50 g"}', 2199, 'INR'),
  ('spf-1', 'GSK-SPF-DEW-50', '50 ml', '{"size":"50 ml"}', 1699, 'INR')
ON CONFLICT (sku) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  title = EXCLUDED.title,
  option_values = EXCLUDED.option_values,
  price = EXCLUDED.price,
  currency = EXCLUDED.currency;

INSERT INTO public.warehouses (code, name, address)
VALUES ('MUM-01', 'Mumbai fulfillment center', '{"city":"Mumbai","country_code":"IN"}')
ON CONFLICT (code) DO UPDATE SET name = EXCLUDED.name, address = EXCLUDED.address;

INSERT INTO public.inventory_levels (warehouse_id, variant_id, quantity_on_hand, quantity_reserved, reorder_point)
SELECT warehouse.id, variant.id, 50, 0, 10
FROM public.warehouses AS warehouse
CROSS JOIN public.product_variants AS variant
WHERE warehouse.code = 'MUM-01'
  AND variant.sku IN ('GSK-CLN-OIL-100', 'GSK-SRM-GLAZE-30', 'GSK-MOI-CER-50', 'GSK-SPF-DEW-50')
ON CONFLICT (warehouse_id, variant_id) DO UPDATE SET
  quantity_on_hand = EXCLUDED.quantity_on_hand,
  quantity_reserved = EXCLUDED.quantity_reserved,
  reorder_point = EXCLUDED.reorder_point;
