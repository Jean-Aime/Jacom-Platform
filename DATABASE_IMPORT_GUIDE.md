# Database Import Guide for JACOM Platform

## Database Files Overview

### Main Database Schema
- **File**: `backend/jas_consulting.sql`
- **Purpose**: Creates all database tables and structure

### Seed Data Files
- **File**: `backend/migrations/seed_data.sql`
- **Purpose**: Sample data for testing (experts, insights, offices, careers, admin user)

### Production Data Files
- **File**: `backend/sql/insert_industries.sql`
- **Purpose**: JACOM-specific industry data (9 industries)
- **File**: `backend/sql/insert_services.sql`
- **Purpose**: JACOM-specific service offerings (9 services)

## Import Order (CRITICAL)

**You MUST import in this exact order:**

1. ✅ `jas_consulting.sql` - Creates database structure
2. ✅ `seed_data.sql` - Adds sample data
3. ✅ `insert_industries.sql` - Adds JACOM industries
4. ✅ `insert_services.sql` - Adds JACOM services

## Method 1: Using phpMyAdmin (Recommended for Beginners)

### Step 1: Access phpMyAdmin
1. Start XAMPP Apache and MySQL
2. Open browser: http://localhost/phpmyadmin
3. Click "New" in left sidebar

### Step 2: Create Database
1. Database name: `jas_consulting`
2. Collation: `utf8mb4_unicode_ci`
3. Click "Create"

### Step 3: Import Files
1. Click on `jas_consulting` database in left sidebar
2. Click "Import" tab at top
3. Click "Choose File"
4. Select `backend/jas_consulting.sql`
5. Scroll down and click "Import"
6. Wait for success message

### Step 4: Import Seed Data
1. Stay in "Import" tab
2. Click "Choose File"
3. Select `backend/migrations/seed_data.sql`
4. Click "Import"

### Step 5: Import Industries
1. Click "Choose File"
2. Select `backend/sql/insert_industries.sql`
3. Click "Import"

### Step 6: Import Services
1. Click "Choose File"
2. Select `backend/sql/insert_services.sql`
3. Click "Import"

## Method 2: Using MySQL Command Line (Advanced)

```bash
# Navigate to XAMPP MySQL bin directory
cd C:\xampp\mysql\bin

# Import main schema
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS jas_consulting CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -u root -p jas_consulting < "C:\xampp\htdocs\Jacom-Platform\backend\jas_consulting.sql"

# Import seed data
mysql -u root -p jas_consulting < "C:\xampp\htdocs\Jacom-Platform\backend\migrations\seed_data.sql"

# Import industries
mysql -u root -p jas_consulting < "C:\xampp\htdocs\Jacom-Platform\backend\sql\insert_industries.sql"

# Import services
mysql -u root -p jas_consulting < "C:\xampp\htdocs\Jacom-Platform\backend\sql\insert_services.sql"
```

## Method 3: Automated Batch Script (Easiest)

Run the provided `import_database.bat` script:

```bash
# Right-click and "Run as Administrator"
import_database.bat
```

## Verification

After import, verify the data:

### Check Tables
```sql
USE jas_consulting;
SHOW TABLES;
```

Expected tables:
- application
- career
- expert
- industry
- insight
- lead
- mediaitem
- office
- service
- subservice
- user

### Check Data Counts
```sql
SELECT 'experts' as table_name, COUNT(*) as count FROM expert
UNION ALL
SELECT 'industries', COUNT(*) FROM industry
UNION ALL
SELECT 'services', COUNT(*) FROM service
UNION ALL
SELECT 'offices', COUNT(*) FROM office
UNION ALL
SELECT 'careers', COUNT(*) FROM career
UNION ALL
SELECT 'insights', COUNT(*) FROM insight
UNION ALL
SELECT 'users', COUNT(*) FROM user;
```

Expected results:
- experts: 2
- industries: 9
- services: 9
- offices: 3
- careers: 2
- insights: 2
- users: 1

## Default Admin Credentials

After import, you can login with:
- **Email**: admin@example.com
- **Password**: admin123

⚠️ **IMPORTANT**: Change this password immediately in production!

## Troubleshooting

### Error: "Table already exists"
**Solution**: Drop the database and recreate:
```sql
DROP DATABASE jas_consulting;
CREATE DATABASE jas_consulting CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Error: "Foreign key constraint fails"
**Solution**: Import files in the correct order (see Import Order above)

### Error: "Duplicate entry"
**Solution**: The data already exists. Skip that file or clear the table first.

## Next Steps

After successful import:

1. ✅ Configure `backend/config/database.php`
2. ✅ Test backend: http://localhost/Jacom-Platform/backend
3. ✅ Setup frontend environment variables
4. ✅ Run frontend: `cd frontend && npm install && npm run dev`

## Database Configuration

Update `backend/config/database.php`:

```php
<?php
return [
    'host' => 'localhost',
    'database' => 'jas_consulting',
    'username' => 'root',
    'password' => '', // Your MySQL password
    'charset' => 'utf8mb4',
    'collation' => 'utf8mb4_unicode_ci'
];
```
