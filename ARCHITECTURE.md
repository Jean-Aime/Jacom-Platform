# Architecture Ownership Map

## Purpose
This document defines source-of-truth ownership for features and data flow in this repository to prevent duplicated logic and conflicting APIs.

## Current Runtime Topology
- Public/admin web app runtime: `frontend/` (Next.js App Router).
- Primary web data access: Prisma from Next.js server components and `frontend/app/api/*` route handlers.
- Separate API surface: `backend/` (PHP REST API), maintained for compatibility and external consumers.

## Canonical Local URLs
- Frontend site: `http://localhost:3000`
- Frontend API routes: `http://localhost:3000/api/*`
- PHP backend API: `http://localhost/Jacom-Platform/backend/*`

Notes:
- Existing references to `http://localhost/webtest-backup/backend` are legacy and should be treated as outdated for this repository path.

## Directory Ownership
| Path | Owner | Responsibility |
| --- | --- | --- |
| `frontend/app` | Frontend platform layer | Page routing, server components, rendering, route-level orchestration |
| `frontend/app/api` | Frontend platform layer | Internal API endpoints for website/admin operations |
| `frontend/components` | Frontend UI layer | Reusable UI components and page sections |
| `frontend/lib` | Frontend shared services | Prisma client, validation, scheduler/email/CRM helpers |
| `frontend/prisma` | Data layer (active) | Active schema, migrations, and seed scripts used by Next.js |
| `backend/controllers` | Backend API layer | PHP REST controllers for external/legacy API contracts |
| `backend/middleware` | Backend security layer | CORS, headers, CSRF, rate limiting |
| `backend/config` | Backend infra config | Database and environment configuration for PHP API |
| `docs` | Engineering process | Security/deployment/process documentation |

## API Ownership Rules
1. For website and admin behavior inside `frontend/`, use:
   - Prisma in server components where direct server-side data access is needed, or
   - `frontend/app/api/*` for client-triggered CRUD and integration workflows.
2. Do not add duplicate business operations to both `frontend/app/api/*` and `backend/*` unless compatibility requires it.
3. Use `backend/*` when:
   - Preserving an existing external PHP API contract, or
   - Maintaining legacy integrations that already depend on PHP endpoints.
4. Any new endpoint must declare an owner in the PR description: `frontend/app/api` or `backend`.

## Data Ownership Rules
- Active schema authority for the Next.js application is `frontend/prisma/schema.prisma`.
- If a DB change affects PHP consumers, update corresponding SQL/migration assets in `backend/migrations` or `backend/sql` and document compatibility impact.
- Backward compatibility is required by default for shared tables and API response shapes.

## Configuration Rules
- Frontend internal calls should use `NEXT_PUBLIC_API_URL=http://localhost:3000/api` (or deployment equivalent).
- Backend base path should be configured explicitly for consumers that call PHP endpoints.
- Do not reuse one env var for both frontend internal API routes and PHP backend routes.

## Change Placement Guide
- UI/UX change only: `frontend/components` and related `frontend/app/*` routes.
- Admin/public CRUD used by web app: `frontend/app/api/*` plus Prisma updates as needed.
- External API contract change: `backend/controllers/*` and `backend/index.php` routing.
- Shared validation/types in frontend: extend `frontend/lib/validation.ts` and `frontend/lib/types.ts` before creating new utility files.

## Compatibility Decision Log (Required per feature)
For each feature PR, include:
1. Selected owner layer (`frontend/app/api` or `backend`) and reason.
2. Affected API contracts and compatibility statement.
3. Migration/rollback impact.
4. Verification performed (smoke checks and manual paths).
