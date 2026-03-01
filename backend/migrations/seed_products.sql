-- Seed products for Store page
INSERT INTO `product` (`id`, `name`, `slug`, `description`, `category`, `price`, `image`, `featured`, `inStock`, `stock`, `status`, `sortOrder`, `createdAt`, `updatedAt`) VALUES
('prd1001', 'Single-Origin Coffee Pack', 'single-origin-coffee-pack', 'Premium single-origin beans with smooth aroma and balanced acidity.', 'Coffee & Beverages', 18.00, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=80', 1, 1, 120, 'published', 1, NOW(), NOW()),
('prd1002', 'Cold Brew Business Bundle', 'cold-brew-business-bundle', 'Bulk cold brew kit for office and events service.', 'Coffee & Beverages', 72.00, 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1400&q=80', 1, 1, 64, 'published', 2, NOW(), NOW()),
('prd1003', 'Smart Soil Sensor Kit', 'smart-soil-sensor-kit', 'IoT sensors for moisture, temperature, and soil health monitoring.', 'Agriculture Tech', 129.00, 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1400&q=80', 1, 1, 45, 'published', 3, NOW(), NOW()),
('prd1004', 'Portable Field Tablet', 'portable-field-tablet', 'Rugged tablet for farm analytics, operations, and field management.', 'Agriculture Tech', 449.00, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1400&q=80', 0, 1, 18, 'published', 4, NOW(), NOW()),
('prd1005', 'Operations Starter Toolkit', 'operations-starter-toolkit', 'Essential hardware set for maintenance and operational teams.', 'Industrial Equipment', 259.00, 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1400&q=80', 0, 1, 20, 'published', 5, NOW(), NOW()),
('prd1006', 'Staff Welcome Box', 'staff-welcome-box', 'Office starter supplies for onboarding and daily team productivity.', 'Office & Staff Essentials', 39.00, 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=80', 0, 1, 85, 'published', 6, NOW(), NOW())
ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `description` = VALUES(`description`),
  `category` = VALUES(`category`),
  `price` = VALUES(`price`),
  `image` = VALUES(`image`),
  `featured` = VALUES(`featured`),
  `inStock` = VALUES(`inStock`),
  `stock` = VALUES(`stock`),
  `status` = VALUES(`status`),
  `sortOrder` = VALUES(`sortOrder`),
  `updatedAt` = NOW();
