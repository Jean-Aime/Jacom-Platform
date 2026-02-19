@echo off
echo ========================================
echo  JACOM Platform - Solutions Migration
echo ========================================
echo.

cd /d "%~dp0"

echo Running enhanced solutions migration...
"C:\xampp\mysql\bin\mysql.exe" -u root jas_consulting < backend\migrations\solutions_enhanced.sql

if %ERRORLEVEL% EQU 0 (
    echo.
    echo [SUCCESS] Solutions table enhanced with benefits and implementationSteps columns!
    echo.
) else (
    echo.
    echo [ERROR] Migration failed. Check if Solution table exists.
    echo.
)

pause
