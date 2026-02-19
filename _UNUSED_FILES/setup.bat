@echo off
echo ========================================
echo Professional SaaS Platform Setup
echo ========================================
echo.

echo [1/4] Setting up Frontend...
cd frontend
if not exist node_modules (
    echo Installing frontend dependencies...
    call npm install
) else (
    echo Frontend dependencies already installed.
)

if not exist .env.local (
    echo Creating .env.local...
    copy .env.example .env.local
    echo Please edit frontend\.env.local with your configuration
)

cd ..
echo.

echo [2/4] Setting up Backend...
if not exist backend\config\config.php (
    echo ERROR: backend\config\config.php not found!
    echo Please configure backend\config\config.php
) else (
    echo Backend configuration found.
)

echo.
echo [3/4] Database Setup...
echo Please import backend\jas_consulting.sql into MySQL
echo.

echo [4/4] Verification...
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost/webtest-backup/backend
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next Steps:
echo 1. Import database: backend\jas_consulting.sql
echo 2. Configure: backend\config\config.php
echo 3. Start XAMPP Apache
echo 4. Run: cd frontend ^&^& npm run dev
echo.
pause
