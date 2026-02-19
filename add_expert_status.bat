@echo off
c:\xampp\mysql\bin\mysql.exe -u root -h localhost jas_consulting < backend\migrations\add_expert_status.sql
if %errorlevel% equ 0 (echo Migration completed!) else (echo Failed!)
pause
