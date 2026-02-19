@echo off
echo ========================================
echo Creating Community Categories Table
echo ========================================
echo.

mysql -u root -p jas_consulting < backend\migrations\create_community_categories.sql

echo.
echo ========================================
echo Migration Complete!
echo ========================================
pause
