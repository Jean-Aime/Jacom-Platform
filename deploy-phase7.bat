@echo off
echo ========================================
echo JACOM PLATFORM - PHASE 7 DEPLOYMENT
echo Backend Migration Production Rollout
echo ========================================
echo.

echo [1/6] Checking prerequisites...
if not exist "frontend\package.json" (
    echo ERROR: Frontend directory not found
    exit /b 1
)

if not exist "backend\index.php" (
    echo ERROR: Backend directory not found
    exit /b 1
)

echo [2/6] Installing dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    exit /b 1
)

echo [3/6] Running pre-deployment tests...
call npm run test:smoke
if %errorlevel% neq 0 (
    echo ERROR: Smoke tests failed
    exit /b 1
)

call npm run test:phase6
if %errorlevel% neq 0 (
    echo ERROR: Phase 6 validation failed
    exit /b 1
)

echo [4/6] Building production bundle...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Build failed
    exit /b 1
)

echo [5/6] Starting production server...
echo Starting frontend on port 3000...
start /b npm start

echo [6/6] Deployment complete!
echo.
echo ========================================
echo PHASE 7 DEPLOYMENT SUCCESSFUL
echo ========================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost/Jacom-Platform/backend
echo Admin:    http://localhost:3000/admin/login
echo.
echo Feature Flag: NEXT_PUBLIC_USE_BACKEND=true
echo Status: Week 1 - 10%% Backend Traffic
echo.
echo Next Steps:
echo 1. Monitor error logs and performance
echo 2. Track user feedback
echo 3. After 1 week, proceed to 50%% rollout
echo.
echo To rollback: Set NEXT_PUBLIC_USE_BACKEND=false
echo ========================================

cd ..
pause