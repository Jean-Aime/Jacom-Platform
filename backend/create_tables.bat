@echo off
cd /d "%~dp0"
echo Creating missing tables...
"C:\xampp\mysql\bin\mysql.exe" -u root jas_consulting < migrations\case_studies.sql
"C:\xampp\mysql\bin\mysql.exe" -u root jas_consulting < migrations\create_solutions_table.sql
echo Done! Tables created.
pause
