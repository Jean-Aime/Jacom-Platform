@echo off
echo Running missing database migrations...
echo.

cd /d "%~dp0"

echo [1/4] Creating Case Studies table...
"C:\xampp\mysql\bin\mysql.exe" -u root jas_consulting < migrations\case_studies.sql
if %errorlevel% neq 0 (
    echo ERROR: Case Studies migration failed
    pause
    exit /b 1
)
echo Case Studies table created successfully!
echo.

echo [2/4] Creating Solutions table...
"C:\xampp\mysql\bin\mysql.exe" -u root jas_consulting < migrations\create_solutions_table.sql
if %errorlevel% neq 0 (
    echo ERROR: Solutions migration failed
    pause
    exit /b 1
)
echo Solutions table created successfully!
echo.

echo [3/4] Creating Products table...
"C:\xampp\mysql\bin\mysql.exe" -u root jas_consulting < migrations\create_products_table.sql
if %errorlevel% neq 0 (
    echo ERROR: Products migration failed
    pause
    exit /b 1
)
echo Products table created successfully!
echo.

echo [4/4] Seeding Products...
"C:\xampp\mysql\bin\mysql.exe" -u root jas_consulting < migrations\seed_products.sql
if %errorlevel% neq 0 (
    echo ERROR: Products seed failed
    pause
    exit /b 1
)
echo Products seeded successfully!
echo.

echo ========================================
echo All migrations completed successfully!
echo ========================================
echo.
echo You can now:
echo 1. Refresh your admin panel
echo 2. Test the API endpoints
echo 3. Manage products from admin panel
echo.
pause
