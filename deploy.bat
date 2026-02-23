@echo off
echo ========================================
echo   JACOM PLATFORM - VERCEL DEPLOYMENT
echo ========================================
echo.

cd frontend

echo [1/4] Installing dependencies...
call npm install

echo.
echo [2/4] Generating Prisma client...
call npx prisma generate

echo.
echo [3/4] Building Next.js...
call npm run build

echo.
echo [4/4] Deploying to Vercel...
call vercel --prod

echo.
echo ========================================
echo   DEPLOYMENT COMPLETE!
echo ========================================
pause
