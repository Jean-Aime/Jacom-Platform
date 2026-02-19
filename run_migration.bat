@echo off
echo Running migration to add service detail tables...
c:\xampp\mysql\bin\mysql.exe -u root -h localhost jas_consulting < backend\migrations\add_service_details_tables.sql
if %errorlevel% equ 0 (
    echo Migration completed successfully!
) else (
    echo Migration failed with error code %errorlevel%
)
pause
