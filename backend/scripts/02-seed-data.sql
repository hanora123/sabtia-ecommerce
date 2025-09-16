-- Seed data for السَبْتِيّة marketplace
-- Insert sample categories, vendors, and products

-- Insert categories
INSERT INTO categories (name_ar, name_en, slug, description_ar, description_en, icon) VALUES
('أدوات', 'Tools', 'tools', 'أدوات ومعدات للورش والمنازل', 'Tools and equipment for workshops and homes', 'Wrench'),
('أقمشة', 'Fabrics', 'fabrics', 'أقمشة وخامات للخياطة والتفصيل', 'Fabrics and materials for sewing and tailoring', 'Shirt'),
('سباكة', 'Plumbing', 'plumbing', 'مستلزمات السباكة والصرف الصحي', 'Plumbing and sanitary supplies', 'Droplets'),
('كهرباء', 'Electrical', 'electrical', 'مستلزمات كهربائية وإلكترونية', 'Electrical and electronic supplies', 'Zap'),
('مواد بناء', 'Construction', 'construction', 'مواد ومستلزمات البناء والتشييد', 'Construction and building materials', 'Hammer'),
('قطع غيار', 'Spare Parts', 'spare-parts', 'قطع غيار للسيارات والآلات', 'Spare parts for cars and machinery', 'Settings');

-- Insert sample admin user
INSERT INTO users (email, password_hash, full_name, phone, user_type, is_verified) VALUES
('admin@sabtiah.com', '$2b$10$example_hash', 'مدير السبتية', '+201234567890', 'admin', true);

-- Insert sample vendors
INSERT INTO users (email, password_hash, full_name, phone, user_type, is_verified) VALUES
('ahmed.tools@sabtiah.com', '$2b$10$example_hash', 'أحمد محمد', '+201111111111', 'vendor', true),
('fatma.fabrics@sabtiah.com', '$2b$10$example_hash', 'فاطمة علي', '+201222222222', 'vendor', true),
('omar.plumbing@sabtiah.com', '$2b$10$example_hash', 'عمر حسن', '+201333333333', 'vendor', true);

-- Get user IDs for vendors
WITH vendor_users AS (
    SELECT id, email FROM users WHERE user_type = 'vendor'
)
INSERT INTO vendors (user_id, shop_name, shop_description, shop_address, shop_phone, is_approved, rating, total_reviews)
SELECT 
    vu.id,
    CASE 
        WHEN vu.email = 'ahmed.tools@sabtiah.com' THEN 'محل أحمد للأدوات'
        WHEN vu.email = 'fatma.fabrics@sabtiah.com' THEN 'أقمشة فاطمة'
        WHEN vu.email = 'omar.plumbing@sabtiah.com' THEN 'سباكة عمر'
    END,
    CASE 
        WHEN vu.email = 'ahmed.tools@sabtiah.com' THEN 'أدوات عالية الجودة للورش والمنازل'
        WHEN vu.email = 'fatma.fabrics@sabtiah.com' THEN 'أقمشة فاخرة وخامات متنوعة'
        WHEN vu.email = 'omar.plumbing@sabtiah.com' THEN 'مستلزمات السباكة والصرف الصحي'
    END,
    'شارع السبتية، القاهرة',
    CASE 
        WHEN vu.email = 'ahmed.tools@sabtiah.com' THEN '+201111111111'
        WHEN vu.email = 'fatma.fabrics@sabtiah.com' THEN '+201222222222'
        WHEN vu.email = 'omar.plumbing@sabtiah.com' THEN '+201333333333'
    END,
    true,
    4.5,
    25
FROM vendor_users vu;

-- Insert sample customers
INSERT INTO users (email, password_hash, full_name, phone, user_type, is_verified) VALUES
('customer1@example.com', '$2b$10$example_hash', 'محمد أحمد', '+201444444444', 'customer', true),
('customer2@example.com', '$2b$10$example_hash', 'سارة محمود', '+201555555555', 'customer', true);

-- Insert sample products
INSERT INTO products (vendor_id, category_id, name_ar, name_en, description_ar, description_en, price, original_price, stock_quantity, images, specifications) VALUES
(
    (SELECT id FROM vendors WHERE shop_name = 'محل أحمد للأدوات'),
    (SELECT id FROM categories WHERE slug = 'tools'),
    'مفتاح إنجليزي مقاس 12',
    'Adjustable Wrench 12-inch',
    'مفتاح إنجليزي عالي الجودة مصنوع من الفولاذ المقاوم للصدأ.',
    'High-quality adjustable wrench made of stainless steel.',
    85.00,
    120.00,
    50,
    '{"/adjustable-wrench-tool.jpg"}',
    '{"size": "12-inch", "material": "Stainless Steel"}'
),
(
    (SELECT id FROM vendors WHERE shop_name = 'أقمشة فاطمة'),
    (SELECT id FROM categories WHERE slug = 'fabrics'),
    'قماش قطني أزرق (للمتر)',
    'Blue Cotton Fabric (per meter)',
    'قماش قطني 100% باللون الأزرق السماوي.',
    '100% cotton fabric in sky blue color.',
    45.00,
    NULL,
    200,
    '{"/blue-cotton-fabric.jpg"}',
    '{"width": "150cm", "material": "100% Cotton"}'
),
(
    (SELECT id FROM vendors WHERE shop_name = 'سباكة عمر'),
    (SELECT id FROM categories WHERE slug = 'plumbing'),
    'مضخة مياه صغيرة 1/2 حصان',
    'Small Water Pump 1/2 HP',
    'مضخة مياه صغيرة مناسبة للاستخدام المنزلي.',
    'Small water pump suitable for domestic use.',
    350.00,
    400.00,
    20,
    '{"/small-water-pump.jpg"}',
    '{"power": "0.5 HP", "voltage": "220V"}'
),
(
    (SELECT id FROM vendors WHERE shop_name = 'محل أحمد للأدوات'),
    (SELECT id FROM categories WHERE slug = 'electrical'),
    'كابل كهرباء 2 متر',
    'Electrical Cable 2 meters',
    'كابل كهرباء نحاسي معزول بطول 2 متر.',
    'Insulated copper electrical cable, 2 meters long.',
    25.00,
    NULL,
    100,
    '{"/usb-cable-2-meters.jpg"}',
    '{"length": "2m", "material": "Copper"}'
),
(
    (SELECT id FROM vendors WHERE shop_name = 'محل أحمد للأدوات'),
    (SELECT id FROM categories WHERE slug = 'tools'),
    'طقم مفكات براغي 6 قطع',
    'Screwdriver Set 6 pieces',
    'طقم مفكات براغي متنوعة للاستخدامات المختلفة.',
    'A set of assorted screwdrivers for various uses.',
    60.00,
    75.00,
    30,
    '{"/screwdriver-set.jpg"}',
    '{"pieces": "6", "material": "Chrome Vanadium"}'
);