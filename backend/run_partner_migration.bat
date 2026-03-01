@echo off
echo Running Partner Logos Migration...
cd /d "%~dp0"
"C:\xampp\mysql\bin\mysql.exe" -u root jas_consulting < migrations\create_partner_logos_table.sql
if %errorlevel% equ 0 (
    echo Migration completed successfully!
) else (
    echo Migration failed!
)
pause
