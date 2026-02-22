@echo off
echo Running missing database migrations...
echo.

cd /d "%~dp0"

echo [1/2] Creating Case Studies table...
"C:\xampp\mysql\bin\mysql.exe" -u root jas_consulting < migrations\case_studies.sql
if %errorlevel% neq 0 (
    echo ERROR: Case Studies migration failed
    pause
    exit /b 1
)
echo Case Studies table created successfully!
echo.

echo [2/2] Creating Solutions table...
"C:\xampp\mysql\bin\mysql.exe" -u root jas_consulting < migrations\create_solutions_table.sql
if %errorlevel% neq 0 (
    echo ERROR: Solutions migration failed
    pause
    exit /b 1
)
echo Solutions table created successfully!
echo.

echo ========================================
echo All migrations completed successfully!
echo ========================================
echo.
echo You can now:
echo 1. Refresh your admin panel
echo 2. Test the API endpoints
echo 3. Add case studies and solutions
echo.
pause
