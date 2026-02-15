# Backend API Smoke Tests

## Quick Start

```bash
npm run test:smoke
```

## What It Tests

- ✅ Backend health check
- ✅ All domain entity endpoints (GET)
- ✅ Public lead creation (POST, expects 201)
- ✅ Protected endpoint without auth (expects 401)
- ✅ Invalid endpoint (expects 404)

## Configuration

Set custom backend URL:
```bash
set BACKEND_BASE_URL=http://your-backend-url
npm run test:smoke
```

## CI/CD

For JSON output (CI-friendly):
```bash
npm run test:smoke:json
```

Exit codes:
- `0` = All tests passed
- `1` = One or more tests failed

## Retry Logic

- Automatically retries failed requests 3 times
- 1 second delay between retries
- Handles network flakiness

## See Also

- `docs/PHASE_2_COMPLETE.md` - Full documentation
- `docs/MIGRATION_PLAN.md` - Overall migration strategy
