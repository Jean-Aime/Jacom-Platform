@echo off
echo ========================================
echo Database Verification Script
echo ========================================
echo.

set MYSQL_BIN=C:\xampp\mysql\bin
set /p MYSQL_PASSWORD="Enter MySQL root password (press Enter if no password): "
echo.

echo Checking database and tables...
echo.

"%MYSQL_BIN%\mysql.exe" -u root --password=%MYSQL_PASSWORD% -e "USE jas_consulting; SHOW TABLES;"

echo.
echo Checking data counts...
echo.

"%MYSQL_BIN%\mysql.exe" -u root --password=%MYSQL_PASSWORD% jas_consulting -e "SELECT 'experts' as table_name, COUNT(*) as count FROM expert UNION ALL SELECT 'industries', COUNT(*) FROM industry UNION ALL SELECT 'services', COUNT(*) FROM service UNION ALL SELECT 'offices', COUNT(*) FROM office UNION ALL SELECT 'careers', COUNT(*) FROM career UNION ALL SELECT 'insights', COUNT(*) FROM insight UNION ALL SELECT 'users', COUNT(*) FROM user;"

echo.
echo Expected counts:
echo - experts: 2
echo - industries: 9
echo - services: 9
echo - offices: 3
echo - careers: 2
echo - insights: 2
echo - users: 1
echo.
pause
