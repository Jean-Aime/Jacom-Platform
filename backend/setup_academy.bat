@echo off
echo Running Academy System Migrations...
echo.

cd /d "%~dp0"

echo Creating Academy Tables...
mysql -u root -p jas_consulting < migrations/create_academy_tables.sql
if %errorlevel% neq 0 (
    echo ERROR: Failed to create tables
    pause
    exit /b 1
)

echo Seeding Academy Data...
mysql -u root -p jas_consulting < migrations/seed_academy_data.sql
if %errorlevel% neq 0 (
    echo ERROR: Failed to seed data
    pause
    exit /b 1
)

echo.
echo ========================================
echo Academy System Setup Complete!
echo ========================================
echo.
pause
