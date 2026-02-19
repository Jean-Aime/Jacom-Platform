@echo off
echo Creating Event table...
c:\xampp\mysql\bin\mysql.exe -u root jas_consulting < backend\migrations\add_event_table.sql
if %errorlevel% equ 0 (
    echo Event table created successfully!
) else (
    echo Failed to create Event table!
)
pause
