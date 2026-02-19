# Database Setup Guide

## Quick Setup (Recommended)

### Step 1: Import Database Structure
```bash
# Run from project root
seed_database.bat
```

This will:
- Create all tables
- Insert sample industries (5 industries)
- Insert sample services (4 services)
- Link industries to services
- Create admin user (admin@jas.com / admin123)

### Step 2: Verify Setup
Visit: http://localhost/Jacom-Platform/backend/test.php

## Manual Setup

### Option 1: Using phpMyAdmin
1. Open http://localhost/phpmyadmin
2. Create database `jas_consulting`
3. Import `backend/jas_consulting.sql`
4. Import `backend/seed_database.sql`

### Option 2: Using MySQL Command Line
```bash
cd C:\xampp\mysql\bin
mysql -u root

CREATE DATABASE jas_consulting;
USE jas_consulting;
SOURCE C:/xampp/htdocs/Jacom-Platform/backend/jas_consulting.sql;
SOURCE C:/xampp/htdocs/Jacom-Platform/backend/seed_database.sql;
```

## Verify Data

### Check Industries
```sql
SELECT id, name, slug FROM Industry;
```
Expected: 5 industries

### Check Services
```sql
SELECT id, name, slug FROM Service;
```
Expected: 4 services

### Check Relationships
```sql
SELECT COUNT(*) FROM _IndustryToService;
```
Expected: 10 relationships

## Test Endpoints

### Backend API
```bash
# Get all industries
curl http://localhost/Jacom-Platform/backend/industries

# Get specific industry
curl http://localhost/Jacom-Platform/backend/industries/management-consulting
```

### Frontend Pages
- All Industries: http://localhost:3000/industries/management-consulting
- Admin Panel: http://localhost:3000/admin/industries

## Troubleshooting

### Error: "Not found"
**Cause**: Database is empty
**Fix**: Run `seed_database.bat`

### Error: "Table doesn't exist"
**Cause**: Database structure not imported
**Fix**: Import `backend/jas_consulting.sql` first

### Error: "Access denied"
**Cause**: MySQL credentials incorrect
**Fix**: Check `backend/config/config.php`

## Available Slugs

After seeding, these industry pages will work:
- `/industries/management-consulting`
- `/industries/technology-iot`
- `/industries/hospitality-tourism`
- `/industries/it-services`
- `/industries/manufacturing`

## Admin Credentials

- Email: admin@jas.com
- Password: admin123

## Next Steps

1. ✅ Seed database
2. ✅ Test backend API
3. ✅ Test frontend pages
4. ✅ Login to admin panel
5. Add more data via admin panel
