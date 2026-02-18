# Jacom Platform

## Project Structure

```
Jacom-Platform/
├── frontend/          # Next.js 15 + TypeScript
├── backend/           # PHP REST API
└── docs/             # All Documentation (59 MD files)
```

## Quick Start

### Backend (PHP)
1. Ensure XAMPP Apache is running
2. Import database: `backend/jas_consulting.sql`
3. Configure: `backend/config/config.php`
4. Test: http://localhost/Jacom-Platform/backend

### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
Open: http://localhost:3000

### Admin Panel
- URL: http://localhost:3000/admin
- Login: admin@jas.com / admin123
- Pages: 10 (Dashboard + 9 management pages)

## Architecture

```
Frontend (Next.js) → API Client → PHP Backend → MySQL Database
```

## Documentation

All documentation is in `/docs` folder (59 files):
- Architecture & Setup Guides
- Phase Completion Reports
- Content Documentation
- Security & Deployment
- API Documentation

## Tech Stack

**Frontend:** Next.js 15, TypeScript, Tailwind CSS, React 18
**Backend:** PHP 8+, MySQL, PDO, RESTful API

## License

Private - All Rights Reserved
