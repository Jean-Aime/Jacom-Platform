@echo off
echo Killing all Node.js, npm, and npx processes...
taskkill /f /im node.exe 2>nul
taskkill /f /im npm.exe 2>nul
taskkill /f /im npx.exe 2>nul
echo Done.
pause