@echo off
echo Killing Node.js processes...

for /f "tokens=2" %%i in ('tasklist /fi "imagename eq node.exe" ^| find "node.exe"') do (
    taskkill /pid %%i /f >nul 2>&1
)

for /f "tokens=2" %%i in ('tasklist /fi "imagename eq npm.cmd" ^| find "npm.cmd"') do (
    taskkill /pid %%i /f >nul 2>&1
)

echo Node processes killed successfully
pause