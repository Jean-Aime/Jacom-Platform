@echo off
echo ========================================
echo JACOM Platform - Database Import Script
echo ========================================
echo.

REM Check if MySQL is running
tasklist /FI "IMAGENAME eq mysqld.exe" 2>NUL | find /I /N "mysqld.exe">NUL
if "%ERRORLEVEL%"=="1" (
    echo [ERROR] MySQL is not running!
    echo Please start MySQL from XAMPP Control Panel
    pause
    exit /b 1
)

echo [OK] MySQL is running
echo.

REM Set paths
set MYSQL_BIN=C:\xampp\mysql\bin
set PROJECT_DIR=%~dp0
set BACKEND_DIR=%PROJECT_DIR%backend

echo Project Directory: %PROJECT_DIR%
echo Backend Directory: %BACKEND_DIR%
echo.

REM Check if files exist
if not exist "%BACKEND_DIR%\jas_consulting.sql" (
    echo [ERROR] Main schema file not found: %BACKEND_DIR%\jas_consulting.sql
    pause
    exit /b 1
)

echo [OK] All required files found
echo.

REM Prompt for MySQL password
set /p MYSQL_PASSWORD="Enter MySQL root password (press Enter if no password): "
echo.

echo ========================================
echo Starting Database Import...
echo ========================================
echo.

REM Step 1: Create database
echo [1/5] Creating database 'jas_consulting'...
"%MYSQL_BIN%\mysql.exe" -u root --password=%MYSQL_PASSWORD% -e "DROP DATABASE IF EXISTS jas_consulting; CREATE DATABASE jas_consulting CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to create database
    pause
    exit /b 1
)
echo [OK] Database created successfully
echo.

REM Step 2: Import main schema
echo [2/5] Importing main schema (jas_consulting.sql)...
"%MYSQL_BIN%\mysql.exe" -u root --password=%MYSQL_PASSWORD% jas_consulting < "%BACKEND_DIR%\jas_consulting.sql"
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to import main schema
    pause
    exit /b 1
)
echo [OK] Main schema imported successfully
echo.

REM Step 3: Import seed data
echo [3/5] Importing seed data (seed_data.sql)...
"%MYSQL_BIN%\mysql.exe" -u root --password=%MYSQL_PASSWORD% jas_consulting < "%BACKEND_DIR%\migrations\seed_data.sql"
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to import seed data
    pause
    exit /b 1
)
echo [OK] Seed data imported successfully
echo.

REM Step 4: Import industries
echo [4/5] Importing JACOM industries (insert_industries.sql)...
"%MYSQL_BIN%\mysql.exe" -u root --password=%MYSQL_PASSWORD% jas_consulting < "%BACKEND_DIR%\sql\insert_industries.sql"
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to import industries
    pause
    exit /b 1
)
echo [OK] Industries imported successfully
echo.

REM Step 5: Import services
echo [5/5] Importing JACOM services (insert_services.sql)...
"%MYSQL_BIN%\mysql.exe" -u root --password=%MYSQL_PASSWORD% jas_consulting < "%BACKEND_DIR%\sql\insert_services.sql"
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to import services
    pause
    exit /b 1
)
echo [OK] Services imported successfully
echo.

echo ========================================
echo Verifying Import...
echo ========================================
echo.

REM Verify data
"%MYSQL_BIN%\mysql.exe" -u root --password=%MYSQL_PASSWORD% jas_consulting -e "SELECT 'experts' as table_name, COUNT(*) as count FROM expert UNION ALL SELECT 'industries', COUNT(*) FROM industry UNION ALL SELECT 'services', COUNT(*) FROM service UNION ALL SELECT 'offices', COUNT(*) FROM office UNION ALL SELECT 'careers', COUNT(*) FROM career UNION ALL SELECT 'insights', COUNT(*) FROM insight UNION ALL SELECT 'users', COUNT(*) FROM user;"

echo.
echo ========================================
echo Database Import Complete!
echo ========================================
echo.
echo Database Name: jas_consulting
echo Admin Email: admin@example.com
echo Admin Password: admin123
echo.
echo IMPORTANT: Change the admin password immediately!
echo.
echo Next Steps:
echo 1. Configure backend/config/database.php
echo 2. Test backend: http://localhost/Jacom-Platform/backend
echo 3. Setup frontend: cd frontend ^&^& npm install
echo 4. Run frontend: npm run dev
echo.
pause
