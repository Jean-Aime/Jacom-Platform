# 🚀 DEPLOYMENT GUIDE - Jacom Platform

## Architecture Overview
- **Frontend**: Next.js → Vercel
- **Backend**: PHP API → cPanel/Shared Hosting
- **Database**: MySQL → Hosting Provider

---

## STEP 1: Deploy Backend (PHP API)

### 1.1 Prepare Backend Files
Upload the `backend/` folder to your hosting via FTP/cPanel File Manager:
```
public_html/
└── api/
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── uploads/
    ├── .htaccess
    └── index.php
```

### 1.2 Configure Backend
Edit `backend/config/config.php`:
```php
define('DB_HOST', 'your-db-host');
define('DB_NAME', 'your-db-name');
define('DB_USER', 'your-db-user');
define('DB_PASS', 'your-db-password');

define('ALLOWED_ORIGINS', [
    'https://your-vercel-domain.vercel.app'
]);

define('ENV', 'production');
define('DEBUG', false);
```

### 1.3 Import Database
1. Create MySQL database in cPanel
2. Import `backend/jas_consulting.sql`
3. Run migrations in `backend/migrations/`

### 1.4 Test Backend
Visit: `https://yourdomain.com/api/services`

---

## STEP 2: Deploy Frontend to Vercel

### 2.1 Install Vercel CLI
```bash
npm i -g vercel
```

### 2.2 Update Environment Variables
Edit `frontend/.env.production`:
```env
DATABASE_URL="mysql://user:pass@host:3306/db"
NEXT_PUBLIC_API_URL="https://yourdomain.com/api"
NEXT_PUBLIC_USE_BACKEND="true"
NEXT_PUBLIC_BACKEND_URL="https://yourdomain.com"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="https://your-vercel-domain.vercel.app"
```

### 2.3 Deploy to Vercel
```bash
cd frontend
vercel --prod
```

### 2.4 Add Environment Variables in Vercel Dashboard
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add all variables from `.env.production`
3. Redeploy

---

## STEP 3: Verify Deployment

### Test Checklist:
- [ ] Homepage loads
- [ ] Services page shows data
- [ ] Industries page works
- [ ] Contact form submits
- [ ] Admin login works
- [ ] Images load correctly
- [ ] API endpoints respond

---

## Quick Deploy Commands

### Frontend Only:
```bash
cd frontend
vercel --prod
```

### Full Redeploy:
```bash
cd frontend
npm run build
vercel --prod
```

---

## Rollback
```bash
vercel rollback
```

---

## Support
- Vercel Logs: `vercel logs`
- Backend Logs: Check cPanel error logs
