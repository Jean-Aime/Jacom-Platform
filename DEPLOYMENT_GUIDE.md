# PRODUCTION DEPLOYMENT GUIDE

## PRE-DEPLOYMENT CHECKLIST

### 1. Database Migration
```bash
# Run migrations
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate

# Verify schema
npx prisma db pull
```

### 2. Environment Variables Setup

Create `.env.production` file:

```env
# Database
DATABASE_URL="mysql://user:password@host:3306/database"

# CRM Integration
CRM_PROVIDER="hubspot"  # or "salesforce"
HUBSPOT_API_KEY="your-hubspot-api-key"
# OR
SALESFORCE_INSTANCE_URL="https://your-instance.salesforce.com"
SALESFORCE_ACCESS_TOKEN="your-salesforce-token"

# Email Service (Resend)
RESEND_API_KEY="re_your_resend_api_key"

# Scheduler Security
CRON_SECRET="generate-strong-random-secret-here"

# NextAuth (if using authentication)
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="generate-strong-random-secret-here"

# Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

### 3. Build Test
```bash
# Test production build locally
npm run build

# Check for errors
# Verify no TypeScript errors
# Verify no build warnings

# Test production server
npm start
```

---

## DEPLOYMENT OPTIONS

### OPTION 1: VERCEL (RECOMMENDED)

#### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

#### Step 2: Login
```bash
vercel login
```

#### Step 3: Deploy
```bash
# First deployment
vercel

# Production deployment
vercel --prod
```

#### Step 4: Configure Environment Variables
```bash
# Via Vercel Dashboard
1. Go to project settings
2. Navigate to Environment Variables
3. Add all variables from .env.production
4. Redeploy
```

#### Step 5: Setup Cron Job
Create `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/scheduler",
    "schedule": "*/5 * * * *"
  }]
}
```

#### Step 6: Configure Domain
```bash
# Add custom domain
vercel domains add yourdomain.com

# Configure DNS
# Add CNAME record: www -> cname.vercel-dns.com
# Add A record: @ -> 76.76.21.21
```

---

### OPTION 2: AWS (EC2 + RDS)

#### Step 1: Setup RDS Database
```bash
1. Create MySQL RDS instance
2. Configure security groups
3. Note connection string
4. Update DATABASE_URL in environment
```

#### Step 2: Setup EC2 Instance
```bash
# SSH into EC2
ssh -i your-key.pem ubuntu@your-ec2-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone repository
git clone your-repo-url
cd your-repo

# Install dependencies
npm install

# Build
npm run build
```

#### Step 3: Configure Environment
```bash
# Create .env file
nano .env

# Paste production environment variables
# Save and exit (Ctrl+X, Y, Enter)
```

#### Step 4: Start with PM2
```bash
# Start application
pm2 start npm --name "consulting-platform" -- start

# Save PM2 configuration
pm2 save

# Setup auto-restart on reboot
pm2 startup
```

#### Step 5: Setup Nginx Reverse Proxy
```bash
# Install Nginx
sudo apt-get install nginx

# Configure Nginx
sudo nano /etc/nginx/sites-available/default
```

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Restart Nginx
sudo systemctl restart nginx
```

#### Step 6: Setup SSL with Let's Encrypt
```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal is configured automatically
```

#### Step 7: Setup Cron Job
```bash
# Edit crontab
crontab -e

# Add scheduler job (runs every 5 minutes)
*/5 * * * * curl -X POST http://localhost:3000/api/scheduler -H "Authorization: Bearer YOUR_CRON_SECRET"
```

---

### OPTION 3: DOCKER + KUBERNETES

#### Step 1: Create Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

#### Step 2: Create docker-compose.yml
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - CRM_PROVIDER=${CRM_PROVIDER}
      - HUBSPOT_API_KEY=${HUBSPOT_API_KEY}
      - CRON_SECRET=${CRON_SECRET}
    depends_on:
      - db

  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_PASSWORD}
      MYSQL_DATABASE: consulting_platform
    volumes:
      - db_data:/var/lib/mysql

  scheduler:
    image: curlimages/curl
    command: >
      sh -c "while true; do
        curl -X POST http://app:3000/api/scheduler
        -H 'Authorization: Bearer ${CRON_SECRET}';
        sleep 300;
      done"
    depends_on:
      - app

volumes:
  db_data:
```

#### Step 3: Deploy
```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

---

## POST-DEPLOYMENT CHECKLIST

### 1. Verify Deployment
- [ ] Visit https://yourdomain.com
- [ ] Verify homepage loads
- [ ] Check all navigation links
- [ ] Test search functionality
- [ ] Test gated content form
- [ ] Verify admin panel access

### 2. Test Critical Paths
- [ ] User can search and find content
- [ ] User can download gated content
- [ ] Lead appears in admin dashboard
- [ ] Admin can create/edit content
- [ ] Scheduled content publishes automatically

### 3. Monitor Performance
```bash
# Check response times
curl -w "@curl-format.txt" -o /dev/null -s https://yourdomain.com

# Monitor server resources
htop  # or pm2 monit
```

### 4. Setup Monitoring

#### Option A: Vercel Analytics
```bash
# Already included in Vercel deployments
# View at: vercel.com/your-project/analytics
```

#### Option B: Google Analytics
```javascript
// Already configured in components/Analytics/GoogleAnalytics.tsx
// Verify tracking ID in environment variables
```

#### Option C: Sentry (Error Tracking)
```bash
npm install @sentry/nextjs

# Configure in next.config.js
```

### 5. Setup Backups

#### Database Backups
```bash
# Automated daily backups
0 2 * * * mysqldump -u user -p database > /backups/db-$(date +\%Y\%m\%d).sql

# Or use RDS automated backups (AWS)
```

#### File Backups
```bash
# Backup uploads directory
0 3 * * * tar -czf /backups/uploads-$(date +\%Y\%m\%d).tar.gz /app/public/uploads
```

### 6. Configure CDN (Optional)

#### Cloudflare Setup
```bash
1. Add site to Cloudflare
2. Update nameservers
3. Enable caching
4. Enable minification
5. Enable Brotli compression
```

---

## ROLLBACK PLAN

### Vercel Rollback
```bash
# List deployments
vercel ls

# Rollback to previous
vercel rollback [deployment-url]
```

### PM2 Rollback
```bash
# Stop current version
pm2 stop consulting-platform

# Checkout previous version
git checkout previous-commit-hash

# Rebuild
npm run build

# Restart
pm2 restart consulting-platform
```

---

## MAINTENANCE MODE

Create `maintenance.html`:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Maintenance</title>
    <style>
        body { font-family: Arial; text-align: center; padding: 50px; }
        h1 { color: #333; }
    </style>
</head>
<body>
    <h1>We'll be back soon!</h1>
    <p>We're performing scheduled maintenance.</p>
</body>
</html>
```

### Enable Maintenance Mode (Nginx)
```nginx
location / {
    return 503;
}

error_page 503 @maintenance;
location @maintenance {
    root /var/www/html;
    rewrite ^(.*)$ /maintenance.html break;
}
```

---

## SECURITY HARDENING

### 1. Enable HTTPS Only
```javascript
// next.config.js
module.exports = {
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains'
        }
      ]
    }]
  }
}
```

### 2. Rate Limiting
```bash
npm install express-rate-limit
```

```javascript
// middleware.ts
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
```

### 3. Security Headers
```javascript
// next.config.js
module.exports = {
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }
      ]
    }]
  }
}
```

---

## MONITORING & ALERTS

### Setup Uptime Monitoring
```bash
# Use services like:
- UptimeRobot (free)
- Pingdom
- StatusCake

# Monitor:
- Homepage (/)
- API health (/api/health)
- Admin panel (/admin)
```

### Setup Error Alerts
```bash
# Email alerts for:
- Server errors (500)
- Database connection failures
- CRM sync failures
- Scheduler failures
```

---

## PERFORMANCE OPTIMIZATION

### 1. Enable Caching
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['yourdomain.com'],
    formats: ['image/avif', 'image/webp']
  }
}
```

### 2. Database Indexing
```sql
-- Add indexes for frequently queried fields
CREATE INDEX idx_insights_status ON Insight(status);
CREATE INDEX idx_insights_published ON Insight(publishedAt);
CREATE INDEX idx_leads_created ON Lead(createdAt);
CREATE INDEX idx_leads_source ON Lead(source);
```

### 3. Enable Compression
```nginx
# Nginx gzip compression
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
gzip_min_length 1000;
```

---

## DEPLOYMENT COMPLETE! 🎉

Your consulting platform is now live in production.

Next steps:
1. Monitor for 24 hours
2. Check error logs
3. Verify all features working
4. Setup automated backups
5. Configure monitoring alerts
