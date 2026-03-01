@echo off
cd /d "%~dp0"
echo Creating missing tables...
"C:\xampp\mysql\bin\mysql.exe" -u root jas_consulting < migrations\case_studies.sql
"C:\xampp\mysql\bin\mysql.exe" -u root jas_consulting < migrations\create_solutions_table.sql
"C:\xampp\mysql\bin\mysql.exe" -u root jas_consulting < migrations\create_products_table.sql
"C:\xampp\mysql\bin\mysql.exe" -u root jas_consulting < migrations\seed_products.sql
echo Done! Tables created.
pause
