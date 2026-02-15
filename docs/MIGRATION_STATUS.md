# Migration Status Dashboard

## Overall Progress: Phase 1 Complete (10% → 20%)

---

## Phase Status

| Phase | Status | Duration | Completion Date |
|-------|--------|----------|-----------------|
| Phase 0: Baseline + Freeze | ✅ Complete | 2-3 days | [Set date] |
| Phase 1: Backend Parity | ✅ Complete | 1 week | [Current date] |
| Phase 2: Contract Tests | ⏳ Next | 3-4 days | - |
| Phase 3: Abstraction Layer | ⏳ Pending | 1 week | - |
| Phase 4: Admin Migration | ⏳ Pending | 2-3 weeks | - |
| Phase 5: Public Pages | ⏳ Pending | 1-2 weeks | - |
| Phase 6: Cleanup | ⏳ Pending | 1 week | - |
| Phase 7: Docs | ⏳ Pending | 2-3 days | - |

---

## Entity Migration Status

| Entity | Backend Parity | Response Normalized | Admin Migrated | Public Migrated | Cleanup |
|--------|---------------|---------------------|----------------|-----------------|---------|
| Industries | ✅ Complete | ✅ Complete | ⏳ Pending | ⏳ Pending | ⏳ Pending |
| Services | ✅ Complete | ✅ Complete | ⏳ Pending | ⏳ Pending | ⏳ Pending |
| Insights | ✅ Complete | ✅ Complete | ⏳ Pending | ⏳ Pending | ⏳ Pending |
| Experts | ✅ Complete | ✅ Complete | ⏳ Pending | ⏳ Pending | ⏳ Pending |
| Offices | ✅ Complete | ✅ Complete | ⏳ Pending | ⏳ Pending | ⏳ Pending |
| Leads | ✅ Complete | ✅ Complete | ⏳ Pending | ⏳ Pending | ⏳ Pending |
| Content | ✅ Complete | ✅ Complete | ⏳ Pending | ⏳ Pending | ⏳ Pending |
| Careers | ✅ Complete | ✅ Complete | ⏳ Pending | ⏳ Pending | ⏳ Pending |

**Legend:**
- ✅ Complete
- 🔄 In Progress
- ⚠️ Partial (needs work)
- ⏳ Pending (not started)
- ❌ Blocked

---

## Phase 1: Backend Parity + Critical Fixes ✅

### Completed Tasks
- ✅ Fixed careers routing bug (`backend/index.php`)
- ✅ Created `CareersController.php` (full CRUD)
- ✅ Completed `LeadsController.php` (added PUT/DELETE)
- ✅ Normalized ALL controllers:
  - ✅ `IndustriesController.php` (relations + 201 status)
  - ✅ `ServicesController.php` (relations + 201 status)
  - ✅ `InsightsController.php` (relations + 201 status)
  - ✅ `ExpertsController.php` (relations + 201 status)
  - ✅ `OfficesController.php` (201 status + null coalescing)

### Remaining Tasks
- ⚠️ Manual testing of all backend endpoints
- ⚠️ Auth flow validation (PHP sessions)

### Exit Criteria
- ✅ Backend supports all required domain operations
- ✅ Response shapes match frontend API (100% complete)
- ⚠️ Auth flow validated (pending)

---

## Phase 2: Contract Tests + CI Gate ⏳

### Tasks
- ⏳ Create `frontend/tests/smoke-api.mjs`
- ⏳ Add retry logic + structured output
- ⏳ Test backend endpoints (happy path + errors)
- ⏳ Add CI gate (GitHub Actions/GitLab CI)
- ⏳ Add `test:smoke` script to `package.json`

### Exit Criteria
- ⏳ Smoke tests pass locally
- ⏳ CI blocks deploy on failure
- ⏳ Tests cover auth + key entities

---

## Phase 3: Frontend API Abstraction + Feature Flags ⏳

### Tasks
- ⏳ Create `frontend/lib/domain-api.ts`
- ⏳ Add `USE_BACKEND` feature flag
- ⏳ Update one admin panel (industries) to use abstraction
- ⏳ Test with both endpoints

### Exit Criteria
- ⏳ Abstraction layer works with both endpoints
- ⏳ One admin panel migrated and tested
- ⏳ Feature flag toggles behavior

---

## Phase 4: Entity-by-Entity Admin Migration ⏳

### Migration Order
1. ⏳ Industries (Week 1)
2. ⏳ Services (Week 1)
3. ⏳ Insights (Week 2)
4. ⏳ Experts (Week 2)
5. ⏳ Offices (Week 3)
6. ⏳ Content (Week 3)
7. ⏳ Leads (Week 3)
8. ⏳ Careers (Week 3)

### Exit Criteria
- ⏳ All admin CRUD runs through backend
- ⏳ No production issues for 1 week
- ⏳ Fallback flags available

---

## Phase 5: Public Page Data Migration ⏳

### Pages to Migrate
- ⏳ `frontend/app/industries/page.tsx`
- ⏳ `frontend/app/services/page.tsx`
- ⏳ `frontend/app/insights/page.tsx`
- ⏳ `frontend/app/experts/page.tsx`
- ⏳ `frontend/app/offices/page.tsx`
- ⏳ `frontend/app/careers/page.tsx`

### Exit Criteria
- ⏳ Public pages fetch from backend API
- ⏳ No performance regression
- ⏳ Caching behavior preserved

---

## Phase 6: Remove Duplicates + Reduce Prisma Scope ⏳

### Routes to Delete
- ⏳ `frontend/app/api/industries/route.ts`
- ⏳ `frontend/app/api/services/route.ts`
- ⏳ `frontend/app/api/insights/route.ts`
- ⏳ `frontend/app/api/experts/route.ts`
- ⏳ `frontend/app/api/offices/route.ts`
- ⏳ `frontend/app/api/leads/route.ts`
- ⏳ `frontend/app/api/content/route.ts`
- ⏳ `frontend/app/api/careers/route.ts`

### Prisma Models to Remove
- ⏳ `Industry`, `Service`, `Insight`, `Expert`, `Office`, `Lead`, `Content`, `Career`

### Exit Criteria
- ⏳ No duplicate endpoints
- ⏳ Prisma only has frontend-only tables
- ⏳ No runtime errors

---

## Phase 7: Config + Docs Finalization ⏳

### Tasks
- ⏳ Update `frontend/.env.local` (point to backend)
- ⏳ Remove `USE_BACKEND` flag
- ⏳ Update `docs/ARCHITECTURE.md`
- ⏳ Update `README.md`
- ⏳ Create `docs/ROLLBACK_GUIDE.md`
- ⏳ Team training session

### Exit Criteria
- ⏳ Docs match runtime reality
- ⏳ Team trained
- ⏳ Rollback guide tested

---

## Blockers & Risks

### Current Blockers
- None

### Identified Risks
1. **Auth Mismatch:** NextAuth vs PHP sessions (needs resolution in Phase 2)
2. **CORS Issues:** Browser calls to backend from localhost:3000 (validate in Phase 3)
3. **Response Shape Drift:** All controllers now normalized ✅

---

## Next Actions

### Immediate (This Week)
1. ✅ Complete Phase 1 backend fixes
2. ⏳ Manual test all backend endpoints
3. ✅ Normalize remaining controllers
4. ⏳ Start Phase 2: Create smoke tests

### Next Week
1. ⏳ Complete Phase 2: Contract tests + CI gate
2. ⏳ Start Phase 3: Abstraction layer

---

## Timeline

**Start Date:** [Set date]
**Current Phase:** Phase 1 Complete
**Estimated Completion:** ~10 weeks from start
**Current Week:** Week 2

---

**Last Updated:** [Current date]
**Updated By:** [Your name]
