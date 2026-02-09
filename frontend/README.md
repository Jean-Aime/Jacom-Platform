# Frontend - Next.js 15 + TypeScript

## Structure
```
frontend/
├── app/              # Next.js App Router
├── components/       # React components
├── lib/              # Utilities & API client
├── public/           # Static assets
└── .env.local        # Environment variables
```

## Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Configure environment:
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost/webtest-backup/backend
```

3. Run development server:
```bash
npm run dev
```

Open http://localhost:3000

## API Client

Use `lib/api-client.ts` to fetch from PHP backend:

```typescript
import { apiClient } from '@/lib/api-client';

// Get industries
const industries = await apiClient.getIndustries();

// Login
await apiClient.login(email, password);
```

## Build for Production
```bash
npm run build
npm start
```
