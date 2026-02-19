@echo off
echo Creating subscriber table...
"C:\xampp\mysql\bin\mysql.exe" -u root jas_consulting < backend\migrations\create_subscribers.sql
echo Done!
pause
