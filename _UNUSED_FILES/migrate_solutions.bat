@echo off
echo Running Solutions migration...
C:\xampp\mysql\bin\mysql.exe -u root jas_consulting < backend\migrations\solutions_simple.sql
if %ERRORLEVEL% EQU 0 (
    echo SUCCESS: Solutions tables created
) else (
    echo ERROR: Migration failed
)
pause
