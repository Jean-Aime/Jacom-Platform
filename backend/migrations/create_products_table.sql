-- Create product table
CREATE TABLE IF NOT EXISTS product (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(500),
    featured TINYINT(1) DEFAULT 0,
    inStock TINYINT(1) DEFAULT 1,
    stock INT,
    status ENUM('draft', 'published', 'archived') DEFAULT 'published',
    sortOrder INT DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_product_category (category),
    INDEX idx_product_status (status),
    INDEX idx_product_featured (featured)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample products
INSERT INTO product (id, name, slug, description, category, price, image, featured, inStock, stock, status, sortOrder) VALUES
('prd1', 'Premium Arabica Coffee Beans', 'premium-arabica-coffee-beans', 'High-quality Arabica beans sourced from sustainable farms', 'Coffee & Beverages', 24.99, 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80', 1, 1, 100, 'published', 1),
('prd2', 'Smart Irrigation Controller', 'smart-irrigation-controller', 'IoT-enabled irrigation system with mobile app control', 'Agriculture Tech', 299.99, 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80', 1, 1, 50, 'published', 2),
('prd3', 'Industrial Safety Equipment Kit', 'industrial-safety-equipment-kit', 'Complete safety gear for industrial operations', 'Industrial Equipment', 149.99, 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=80', 1, 1, 75, 'published', 3),
('prd4', 'Office Productivity Bundle', 'office-productivity-bundle', 'Essential office supplies and productivity tools', 'Office & Staff Essentials', 89.99, 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80', 1, 1, 200, 'published', 4),
('prd5', 'Organic Espresso Blend', 'organic-espresso-blend', 'Rich and bold espresso blend for professional baristas', 'Coffee & Beverages', 29.99, 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80', 0, 1, 150, 'published', 5),
('prd6', 'Soil Moisture Sensor', 'soil-moisture-sensor', 'Precision agriculture sensor for optimal crop management', 'Agriculture Tech', 79.99, 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80', 0, 1, 120, 'published', 6);
