# Quick Database Setup - JACOM Platform

## 🚀 Fastest Method (Recommended)

### Option 1: Automated Script
```bash
# Right-click and "Run as Administrator"
import_database.bat
```

### Option 2: phpMyAdmin (Manual)
1. Open http://localhost/phpmyadmin
2. Create database: `jas_consulting` (utf8mb4_unicode_ci)
3. Import files in this order:
   - `backend/jas_consulting.sql`
   - `backend/migrations/seed_data.sql`
   - `backend/sql/insert_industries.sql`
   - `backend/sql/insert_services.sql`

## 📊 Database Contents

After import, you'll have:

### Industries (9)
- Management Consulting
- Technology & IoT Solutions
- Hospitality & Tourism
- IT Services & Software Development
- Manufacturing & Industry 4.0
- Education & Training
- Energy & Utilities
- Real Estate & Infrastructure
- Financial Services & Investment

### Services (9)
- Digital Transformation & DX Consulting
- IoT Platform & System Integration
- Recruitment & Training Services
- Smart Factory & Industry 4.0
- Renewable Energy Systems
- Smart Building & Infrastructure
- Web Development Training
- Financial Advisory & Investment
- Project Management Office (PMO)

### Sample Data
- 2 Experts
- 3 Offices (New York, London, Singapore)
- 2 Career Positions
- 2 Insights/Articles
- 1 Admin User

## 🔐 Default Login

**Email**: admin@example.com  
**Password**: admin123

⚠️ **Change this immediately in production!**

## ✅ Verify Import

Run verification script:
```bash
verify_database.bat
```

Or check manually in phpMyAdmin:
- Database: `jas_consulting`
- Tables: 17 tables
- Data: See counts above

## 🔧 Configure Backend

Edit `backend/config/database.php`:
```php
<?php
return [
    'host' => 'localhost',
    'database' => 'jas_consulting',
    'username' => 'root',
    'password' => '', // Your MySQL password
];
```

## 🧪 Test Backend

Visit: http://localhost/Jacom-Platform/backend

Expected response:
```json
{
  "status": "success",
  "message": "JACOM Platform API is running"
}
```

## 📝 Next Steps

1. ✅ Import database (you're here!)
2. ⬜ Configure backend database connection
3. ⬜ Test backend API endpoints
4. ⬜ Setup frontend environment
5. ⬜ Install frontend dependencies: `cd frontend && npm install`
6. ⬜ Run frontend: `npm run dev`

## 🆘 Troubleshooting

### MySQL not running
- Open XAMPP Control Panel
- Start MySQL service

### Import fails
- Check MySQL password
- Ensure database doesn't exist (script will recreate)
- Check file paths are correct

### Can't access phpMyAdmin
- Ensure Apache is running in XAMPP
- Visit: http://localhost/phpmyadmin

## 📚 Full Documentation

See `DATABASE_IMPORT_GUIDE.md` for detailed instructions.
