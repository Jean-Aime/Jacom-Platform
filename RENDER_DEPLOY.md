# 🚀 Deploy Backend to Render

## Step 1: Create MySQL Database on Render
1. Go to [render.com](https://render.com)
2. New → PostgreSQL or use external MySQL (PlanetScale, Railway)
3. Copy connection details

## Step 2: Deploy Backend
1. New → Web Service
2. Connect your Git repo
3. Select `Jacom-Platform`
4. Render auto-detects `render.yaml`

## Step 3: Add Environment Variables
In Render Dashboard → Environment:
```
DB_HOST=your-db-host
DB_NAME=jas_consulting
DB_USER=your-user
DB_PASS=your-password
ENV=production
```

## Step 4: Deploy
Click "Create Web Service" - Render builds Docker image automatically

## Step 5: Get Backend URL
Copy: `https://jacom-backend.onrender.com`

## Step 6: Update Frontend
Edit `frontend/.env.production`:
```env
NEXT_PUBLIC_BACKEND_URL="https://jacom-backend.onrender.com"
NEXT_PUBLIC_API_URL="https://jacom-backend.onrender.com/api"
```

## Test
Visit: `https://jacom-backend.onrender.com/api/services`

---

## Local Docker Test (Optional)
```bash
docker build -t jacom-backend .
docker run -p 8080:80 jacom-backend
```
Visit: `http://localhost:8080/api/services`
