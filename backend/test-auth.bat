@echo off
REM Phase 1 Auth Validation Script
REM Tests login + protected endpoints with session cookies

echo ========================================
echo Phase 1: Auth Flow Validation
echo ========================================
echo.

REM Set backend URL
set BACKEND_URL=http://localhost/Jacom-Platform/backend

echo [1/5] Testing health check...
curl -s %BACKEND_URL% > nul
if %errorlevel% equ 0 (
    echo ✓ Backend is running
) else (
    echo ✗ Backend is not accessible
    exit /b 1
)
echo.

echo [2/5] Testing login...
echo Enter admin email:
set /p ADMIN_EMAIL=
echo Enter admin password:
set /p ADMIN_PASSWORD=
echo.

curl -X POST %BACKEND_URL%/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"%ADMIN_EMAIL%\",\"password\":\"%ADMIN_PASSWORD%\"}" ^
  -c cookies.txt ^
  -w "\nHTTP Status: %%{http_code}\n"

echo.
echo [3/5] Testing protected read (GET /leads)...
curl -s %BACKEND_URL%/leads ^
  -b cookies.txt ^
  -w "\nHTTP Status: %%{http_code}\n"

echo.
echo [4/5] Testing protected write (POST /industries)...
curl -X POST %BACKEND_URL%/industries ^
  -H "Content-Type: application/json" ^
  -b cookies.txt ^
  -d "{\"name\":\"Test Auth Industry\",\"slug\":\"test-auth-industry\",\"description\":\"Auth test\",\"overview\":\"\",\"challenges\":\"\",\"trends\":\"\",\"featured\":false}" ^
  -w "\nHTTP Status: %%{http_code}\n"

echo.
echo [5/5] Testing without auth (should fail)...
curl -s %BACKEND_URL%/leads ^
  -w "\nHTTP Status: %%{http_code}\n"

echo.
echo ========================================
echo Auth Validation Complete
echo ========================================
echo.
echo Expected results:
echo - Login: 200 with user object
echo - Protected read: 200 with data
echo - Protected write: 201 with success
echo - No auth: 401 or 403
echo.
echo Check cookies.txt to verify session cookie was set
echo.

pause
