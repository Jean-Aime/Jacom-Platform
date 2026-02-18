@echo off
echo ========================================
echo   JACOM Platform - Database Seeder
echo ========================================
echo.

set MYSQL_PATH=C:\xampp\mysql\bin\mysql.exe

if not exist "%MYSQL_PATH%" (
    echo ERROR: MySQL not found at %MYSQL_PATH%
    echo Please update MYSQL_PATH in this script
    pause
    exit /b 1
)

echo Seeding database...
"%MYSQL_PATH%" -u root < "%~dp0backend\seed_database.sql"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   SUCCESS! Database seeded
    echo ========================================
    echo.
    echo You can now access:
    echo - Frontend: http://localhost:3000
    echo - Backend API: http://localhost/Jacom-Platform/backend
    echo - Admin Panel: http://localhost:3000/admin
    echo.
) else (
    echo.
    echo ERROR: Failed to seed database
    echo Make sure XAMPP MySQL is running
)

pause
