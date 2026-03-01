# Store/Products Feature - Complete Setup Guide

## 🎯 Overview
Complete e-commerce product management system with:
- ✅ Backend API (ProductsController.php)
- ✅ Database table (product)
- ✅ Admin panel (/admin/products)
- ✅ Public store page (/store)
- ✅ Full CRUD operations

## 🚀 Quick Setup (3 Steps)

### Step 1: Run Database Migration
Open in browser:
```
http://localhost/Jacom-Platform/backend/test_products.html
```
Click "Create Product Table & Sample Data"

### Step 2: Verify API Works
In the same page, click "GET /products" to verify 6 sample products loaded

### Step 3: Access Pages
- **Admin Panel**: http://localhost:3000/admin/products
- **Public Store**: http://localhost:3000/store

## 📁 Files Overview

### Backend Files
```
backend/
├── controllers/ProductsController.php          ✅ Full CRUD controller
├── migrations/create_products_table.sql        ✅ Database schema
├── migrate_products.php                        ✅ Migration runner
├── test_products.html                          ✅ Setup & test page
└── index.php                                   ✅ Route registered
```

### Frontend Files
```
frontend/
├── app/store/page.tsx                          ✅ Public store page
├── app/admin/products/page.tsx                 ✅ Admin management
├── components/Store/StoreCatalog.tsx           ✅ Product catalog
└── lib/api-client.ts                           ✅ API methods
```

## 🗄️ Database Schema

```sql
CREATE TABLE product (
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
    createdAt DATETIME,
    updatedAt DATETIME
);
```

## 🔌 API Endpoints

### Public Endpoints
```
GET  /products                          # Get all products
GET  /products?status=published         # Filter by status
GET  /products?category=Coffee          # Filter by category
GET  /products?featured=true            # Get featured only
GET  /products?q=coffee                 # Search products
GET  /products?take=20                  # Limit results
GET  /products/{id}                     # Get single product
```

### Admin Endpoints (Requires Auth)
```
POST   /products                        # Create product
PUT    /products/{id}                   # Update product
DELETE /products/{id}                   # Delete product
```

## 📦 Sample Products Included

1. **Premium Arabica Coffee Beans** - $24.99
2. **Smart Irrigation Controller** - $299.99
3. **Industrial Safety Equipment Kit** - $149.99
4. **Office Productivity Bundle** - $89.99
5. **Organic Espresso Blend** - $29.99
6. **Soil Moisture Sensor** - $79.99

## 🎨 Categories

- Coffee & Beverages
- Agriculture Tech
- Industrial Equipment
- Office & Staff Essentials

## 💻 Admin Panel Features

### Product Management
- ✅ Create/Edit/Delete products
- ✅ Set product name, slug, category
- ✅ Set price and stock levels
- ✅ Upload product images
- ✅ Mark as featured
- ✅ Set status (published/draft)
- ✅ Sort order control
- ✅ Search and filter
- ✅ Real-time validation

### Access Admin Panel
1. Login: http://localhost:3000/admin/login
2. Navigate to Products: http://localhost:3000/admin/products

## 🛍️ Public Store Features

### Store Page (/store)
- ✅ Hero section with CTA
- ✅ Category cards (auto-generated)
- ✅ Product grid with images
- ✅ Price display
- ✅ "Add to Inquiry" buttons
- ✅ Responsive design
- ✅ Loading states
- ✅ Error handling

### Product Display
- Product image
- Category badge
- Product name
- Description
- Price (formatted)
- Stock status
- Add to Inquiry button

## 🔧 API Usage Examples

### Fetch Products (Frontend)
```javascript
const res = await fetch('http://localhost/Jacom-Platform/backend/products?status=published');
const products = await res.json();
```

### Using API Client
```javascript
import { apiClient } from '@/lib/api-client';

// Get all products
const products = await apiClient.getProducts({ status: 'published', take: 20 });

// Get single product
const product = await apiClient.getProductByIdOrSlug('premium-arabica-coffee-beans');

// Create product (admin only)
await apiClient.createProduct({
  name: 'New Product',
  slug: 'new-product',
  category: 'Coffee & Beverages',
  price: 19.99,
  description: 'Product description',
  image: 'https://...',
  featured: false,
  inStock: true,
  stock: 100,
  status: 'published'
});
```

## 🐛 Troubleshooting

### "Failed to fetch products" Error

**Solution 1: Run Migration**
```
http://localhost/Jacom-Platform/backend/test_products.html
```
Click "Create Product Table & Sample Data"

**Solution 2: Check XAMPP**
- Ensure Apache is running
- Ensure MySQL is running
- Check database `jas_consulting` exists

**Solution 3: Test API Directly**
```
http://localhost/Jacom-Platform/backend/products
```
Should return JSON array of products

### Products Not Showing on Store Page

1. Check browser console for errors
2. Verify API returns data: `http://localhost/Jacom-Platform/backend/products?status=published`
3. Check `.env.local` has correct backend URL
4. Clear browser cache and reload

### Cannot Add Products in Admin

1. Ensure you're logged in as admin
2. Check browser console for authentication errors
3. Verify session is active
4. Try logging out and back in

## 📊 Product Fields Explained

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Product name |
| slug | string | Yes | URL-friendly identifier (auto-generated) |
| category | string | Yes | Product category |
| price | decimal | Yes | Product price in USD |
| description | text | No | Product description |
| image | string | No | Image URL |
| featured | boolean | No | Show in featured section |
| inStock | boolean | No | Availability status |
| stock | integer | No | Stock quantity (null = unlimited) |
| status | enum | No | published/draft/archived |
| sortOrder | integer | No | Display order (lower = first) |

## 🎯 Next Steps

1. **Run Setup**: http://localhost/Jacom-Platform/backend/test_products.html
2. **Add Real Products**: http://localhost:3000/admin/products
3. **Upload Product Images**: Use image URL or upload feature
4. **Customize Categories**: Edit categories in admin panel
5. **Test Store Page**: http://localhost:3000/store

## ✨ Features Summary

### Backend
- ✅ RESTful API with full CRUD
- ✅ Query parameters (status, category, featured, search)
- ✅ Pagination support
- ✅ Slug auto-generation
- ✅ Input validation
- ✅ Error handling
- ✅ Session-based auth for admin operations

### Frontend
- ✅ Admin panel with full management
- ✅ Public store page with catalog
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Loading states
- ✅ Error handling
- ✅ Search and filter
- ✅ Real-time updates

### Database
- ✅ Optimized schema with indexes
- ✅ Sample data included
- ✅ Migration script
- ✅ Unique slug constraint

## 🎉 Complete!

The store/products system is fully implemented and ready to use!

**Quick Links:**
- Setup: http://localhost/Jacom-Platform/backend/test_products.html
- Admin: http://localhost:3000/admin/products
- Store: http://localhost:3000/store
- API: http://localhost/Jacom-Platform/backend/products
