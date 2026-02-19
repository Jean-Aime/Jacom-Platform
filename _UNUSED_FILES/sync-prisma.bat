@echo off
echo Syncing Prisma with database...
cd frontend
call npx prisma db push --skip-generate
call npx prisma generate
echo Done! Restart your Next.js dev server.
pause
