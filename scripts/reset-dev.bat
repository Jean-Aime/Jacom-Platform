@echo off
echo Cleaning Node processes and regenerating Prisma client...

REM Kill Node processes
for /f "tokens=2" %%i in ('tasklist /fi "imagename eq node.exe" ^| find "node.exe"') do (
    taskkill /pid %%i /f >nul 2>&1
)

echo Node processes killed

REM Navigate to frontend and regenerate Prisma
cd /d "%~dp0..\frontend"

echo Regenerating Prisma client...
npx prisma generate

echo Done!
pause