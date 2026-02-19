@echo off
echo ========================================
echo Seeding Case Studies Data
echo ========================================
echo.

type backend\migrations\seed_case_studies.sql | C:\xampp\mysql\bin\mysql.exe -u root jas_consulting

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo SUCCESS! Case Studies Seeded
    echo ========================================
    echo.
    echo 5 case studies have been added to the database.
    echo.
    echo Visit: http://localhost:3000/case-studies
    echo Admin: http://localhost:3000/admin/case-studies
    echo.
) else (
    echo.
    echo ========================================
    echo ERROR: Seeding Failed
    echo ========================================
    echo.
    echo Please run manually in phpMyAdmin:
    echo 1. Open http://localhost/phpmyadmin
    echo 2. Select 'jas_consulting' database
    echo 3. Click 'SQL' tab
    echo 4. Copy content from: backend/migrations/seed_case_studies.sql
    echo 5. Click 'Go'
    echo.
)

pause
