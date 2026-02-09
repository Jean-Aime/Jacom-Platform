# Jacom Platform

## Project Structure

```
Jacom-Platform/
├── frontend/          # Next.js 15 + TypeScript
├── backend/           # PHP REST API
└── docs/             # Documentation
```

## Quick Start

### Backend (PHP)
1. Ensure XAMPP Apache is running
2. Import database: `backend/jas_consulting.sql`
3. Configure: `backend/config/config.php`
4. Test: http://localhost/Jacom-Platform/backend

### Frontend (Next.js)
1. Navigate to frontend:
```bash
cd frontend
npm install
```

2. Configure environment:
```bash
cp .env.example .env.local
```

3. Run development:
```bash
npm run dev
```

4. Open: http://localhost:3000

## Architecture

```
Frontend (Next.js) → API Client → PHP Backend → MySQL Database
```

## Security Features

✅ SQL Injection Prevention (PDO)
✅ XSS Protection (Input sanitization)
✅ CSRF Protection (Origin validation)
✅ Rate Limiting (IP-based)
✅ Session Management (Secure tokens)
✅ Security Headers (CSP, HSTS, etc.)

## Documentation

- Frontend: `frontend/README.md`
- Backend: `backend/README.md`
- Security: `docs/SECURITY_CHECKLIST.md`
- Deployment: `docs/DEPLOYMENT_GUIDE.md`

## Tech Stack

### Frontend
- Next.js 15
- TypeScript
- Tailwind CSS
- React 18

### Backend
- PHP 8+
- MySQL
- PDO
- RESTful API

## Development

### Frontend
```bash
cd frontend
npm run dev
```

### Backend
Runs on XAMPP Apache at:
```
http://localhost/Jacom-Platform/backend
```

## Production Deployment

See `docs/DEPLOYMENT_GUIDE.md` for complete instructions.

## License

Private - All Rights Reserved
