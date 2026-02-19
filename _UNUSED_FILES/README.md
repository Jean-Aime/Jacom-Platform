# Unused Files Archive

This folder contains files that are NOT part of the active platform functionality.

## Contents:

### Test Files (Root Level)
- `test.php` - Backend test file
- `test-api.html` - API testing HTML
- `test-login.html` - Login testing HTML
- `test_solutions.php` - Solutions test file
- `add_education.sql` - Old SQL file
- `phase6-dashboard.html` - Phase 6 test dashboard
- `create-admin.ts` - Admin creation script

### Folders
- `test-industries/` - Test industries page (not used)
- `tests/` - Old test files (crud-test.js, phase6 tests, smoke tests)

### Seed Files
- `seed.ts` - Prisma seed script
- `seed-case-studies.ts` - Case studies seed
- `seed-industries.ts` - Industries seed
- `seed-subscribers.ts` - Subscribers seed

### Old Migrations (`old_migrations/`)
- Multiple outdated SQL migration files
- Service-related migrations
- Solutions-related migrations
- Update scripts

### Old Documentation (`old_docs/`)
- `CASE_STUDIES_SETUP.md`
- `DATABASE_SETUP.md`
- `FIX_SUMMARY.md`
- `INTEGRATION_COMPLETE.md`
- `SOLUTIONS_COMPLETE.md`
- `SOLUTIONS_IMPLEMENTATION.md`
- `SOLUTIONS_QUICK_START.md`
- `SOLUTIONS_SETUP.md`
- `SYSTEM_STRUCTURE.md`
- `QUICK_START.md`

## Why These Files Are Not Used:

1. **Test files** - Development/debugging only, not production code
2. **Seed files** - Database already seeded, not needed in runtime
3. **Old migrations** - Already applied or superseded by newer migrations
4. **Old docs** - Outdated documentation, replaced by current docs in `/docs`

## Can These Be Deleted?

**YES** - These files can be safely deleted if:
- Database is already set up and seeded
- You don't need test/debug files
- You have backups

**Keep them if:**
- You need to reset/reseed the database
- You want reference for old implementations
- You're debugging historical issues

---

**Created:** 2025-01-XX  
**Purpose:** Clean up unused files from active codebase
