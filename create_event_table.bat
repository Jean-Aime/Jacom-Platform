@echo off
c:\xampp\mysql\bin\mysql.exe -u root -h localhost jas_consulting < backend\migrations\add_event_table.sql
if %errorlevel% equ 0 (echo Event table created!) else (echo Failed!)
pause
