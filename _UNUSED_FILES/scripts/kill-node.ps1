# Kill all Node.js processes
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
Get-Process -Name "npm" -ErrorAction SilentlyContinue | Stop-Process -Force
Get-Process -Name "npx" -ErrorAction SilentlyContinue | Stop-Process -Force

Write-Host "All Node processes killed successfully" -ForegroundColor Green