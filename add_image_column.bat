@echo off
c:\xampp\mysql\bin\mysql.exe -u root jas_consulting < backend\migrations\add_image_to_event.sql
if %errorlevel% equ 0 (echo Image column added!) else (echo Failed!)
pause
