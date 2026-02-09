# 🔄 PHP BACKEND MIGRATION GUIDE

## ✅ COMPLETED

### Backend (PHP)
- ✅ Database connection with PDO
- ✅ Security middleware (CORS, CSRF, Rate Limiting)
- ✅ Authentication controller (Login/Logout)
- ✅ Industries controller (CRUD)
- ✅ Session management
- ✅ Input sanitization
- ✅ Clean URL routing

### Frontend (Next.js)
- ✅ API client for PHP backend
- ✅ Environment configuration
- ✅ TypeScript types

---

## 🚀 SETUP INSTRUCTIONS

### 1. XAMPP Configuration

Ensure Apache is running and mod_rewrite is enabled:

**httpd.conf:**
```apache
LoadModule rewrite_module modules/mod_rewrite.so
```

**Virtual Host (optional):**
```apache
<VirtualHost *:80>
    DocumentRoot "C:/xampp/htdocs/webtest-backup"
    ServerName localhost
    
    <Directory "C:/xampp/htdocs/webtest-backup/api-php">
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

### 2. Test PHP API

Start XAMPP and test:
```bash
# Test API is running
curl http://localhost/webtest-backup/api-php

# Test industries endpoint
curl http://localhost/webtest-backup/api-php/industries
```

### 3. Update Frontend to Use PHP API

Replace existing API calls with new client:

**Before (Next.js API):**
```typescript
const response = await fetch('/api/industries');
```

**After (PHP API):**
```typescript
import { apiClient } from '@/lib/api-client';
const industries = await apiClient.getIndustries();
```

---

## 📋 MIGRATION CHECKLIST

### Immediate Tasks:
- [x] PHP backend structure created
- [x] Security middleware implemented
- [x] Auth controller created
- [x] Industries controller created
- [x] Frontend API client created
- [ ] Update all frontend components to use apiClient
- [ ] Create remaining controllers (Services, Insights, Experts, etc.)
- [ ] Test all endpoints
- [ ] Remove old Next.js API routes

### Controllers to Create:
- [ ] ServicesController.php
- [ ] InsightsController.php
- [ ] ExpertsController.php
- [ ] CareersController.php
- [ ] OfficesController.php
- [ ] LeadsController.php
- [ ] ApplicationsController.php
- [ ] MediaController.php
- [ ] ContentController.php

---

## 🔒 SECURITY FEATURES

### PHP Backend Security:
✅ PDO prepared statements (SQL injection prevention)
✅ Input sanitization (XSS prevention)
✅ CSRF validation
✅ Rate limiting
✅ Session-based authentication
✅ Secure cookies (httpOnly, secure, sameSite)
✅ Security headers
✅ CORS configuration
✅ Error logging (not exposing to client)

---

## 📝 EXAMPLE USAGE

### Login
```typescript
import { apiClient } from '@/lib/api-client';

const handleLogin = async () => {
  try {
    await apiClient.login('admin@example.com', 'password');
    // Redirect to dashboard
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

### Fetch Industries
```typescript
import { apiClient } from '@/lib/api-client';

const IndustriesPage = async () => {
  const industries = await apiClient.getIndustries();
  
  return (
    <div>
      {industries.map(industry => (
        <div key={industry.id}>{industry.name}</div>
      ))}
    </div>
  );
};
```

### Create Industry (Admin)
```typescript
const handleCreate = async (data) => {
  try {
    await apiClient.createIndustry(data);
    // Success
  } catch (error) {
    console.error('Create failed:', error);
  }
};
```

---

## 🧪 TESTING

### Test Authentication:
```bash
# Login
curl -X POST http://localhost/webtest-backup/api-php/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password"}' \
  -c cookies.txt

# Logout
curl -X POST http://localhost/webtest-backup/api-php/auth/logout \
  -b cookies.txt
```

### Test Industries:
```bash
# Get all
curl http://localhost/webtest-backup/api-php/industries

# Get by slug
curl http://localhost/webtest-backup/api-php/industries/technology

# Create (requires auth)
curl -X POST http://localhost/webtest-backup/api-php/industries \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"name":"Tech","slug":"tech","description":"..."}'
```

---

## 🔧 TROUBLESHOOTING

### CORS Issues:
Update allowed origins in `api-php/middleware/Security.php`:
```php
$allowedOrigins = ['http://localhost:3000', 'https://yourdomain.com'];
```

### Session Not Working:
Check PHP session settings in `php.ini`:
```ini
session.cookie_httponly = 1
session.cookie_secure = 1
session.cookie_samesite = Strict
```

### 404 Errors:
Ensure `.htaccess` is working:
```bash
# Test mod_rewrite
curl -I http://localhost/webtest-backup/api-php/industries
```

---

## 📊 ARCHITECTURE

```
Frontend (Next.js)
    ↓ HTTP Requests
API Client (lib/api-client.ts)
    ↓ fetch()
PHP Backend (api-php/)
    ↓ PDO
MySQL Database
```

---

## 🎯 NEXT STEPS

1. **Create remaining controllers** using template
2. **Update frontend components** to use apiClient
3. **Test all endpoints** with Postman/curl
4. **Remove old Next.js API routes** (app/api/)
5. **Deploy to production** with proper environment variables

---

## 📞 SUPPORT

- PHP Backend: `api-php/`
- Frontend Client: `lib/api-client.ts`
- Controllers Template: `api-php/CONTROLLERS_TEMPLATE.md`
- Security: `api-php/middleware/Security.php`
