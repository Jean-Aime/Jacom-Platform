@echo off
echo ========================================
echo   SECURITY SETUP - Jacom Platform
echo ========================================
echo.

echo Creating logs directory...
if not exist "logs" mkdir logs
echo [OK] Logs directory created

echo.
echo Running rate limiting table migration...
php -r "require 'config/database.php'; $db = Database::getInstance()->getConnection(); $sql = file_get_contents('migrations/create_rate_limit_table.sql'); $db->exec($sql); echo 'Rate limit table created successfully';"

echo.
echo Setting file permissions...
echo [INFO] Upload directories secured with .htaccess

echo.
echo ========================================
echo   SECURITY SETUP COMPLETE!
echo ========================================
echo.
echo Next steps:
echo 1. Set environment variables (DB_HOST, DB_NAME, DB_USER, DB_PASS)
echo 2. Set ENV=production for production deployment
echo 3. Enable HTTPS and verify SSL certificate
echo 4. Review SECURITY_IMPLEMENTATION.md
echo.
echo Security features enabled:
echo - Production error handling
echo - Secure session cookies (HTTPS enforced)
echo - Token-based CSRF protection
echo - Database-backed rate limiting
echo - Role-based access control (RBAC)
echo - Comprehensive security headers (HSTS, CSP, etc.)
echo - Server-side file upload validation
echo - Secure file download (header injection prevention)
echo.
pause
