@echo off
echo ========================================
echo EMERGENCY ROLLBACK - PHASE 7
echo Reverting to Frontend API Routes
echo ========================================
echo.

echo [1/4] Backing up current configuration...
copy .env.local .env.local.backup.%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%

echo [2/4] Reverting feature flag...
powershell -Command "(Get-Content .env.local) -replace 'NEXT_PUBLIC_USE_BACKEND=\"true\"', 'NEXT_PUBLIC_USE_BACKEND=\"false\"' | Set-Content .env.local"

echo [3/4] Restarting frontend server...
cd frontend
taskkill /f /im node.exe /t 2>nul
timeout /t 2 /nobreak >nul
start /b npm start

echo [4/4] Verifying rollback...
timeout /t 5 /nobreak >nul
curl -s http://localhost:3000/api/industries >nul
if %errorlevel% equ 0 (
    echo ✅ Rollback successful - Frontend API active
) else (
    echo ❌ Rollback verification failed
)

echo.
echo ========================================
echo ROLLBACK COMPLETE
echo ========================================
echo.
echo Status: Using Frontend API Routes
echo Feature Flag: NEXT_PUBLIC_USE_BACKEND=false
echo.
echo Next Steps:
echo 1. Investigate the issue that triggered rollback
echo 2. Fix the problem in backend API
echo 3. Re-test thoroughly before next deployment
echo 4. Update team on rollback status
echo.
echo Backup saved as: .env.local.backup.*
echo ========================================

cd ..
pause