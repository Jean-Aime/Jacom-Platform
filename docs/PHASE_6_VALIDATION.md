# Phase 6: Runtime Validation & Production Readiness

**Goal:** Validate all admin panels work in both modes and prepare for production rollout.

---

## Testing Matrix

### Frontend API Mode (USE_BACKEND=false)

| Entity | List | Create | Update | Delete | Relations | Status |
|--------|------|--------|--------|--------|-----------|--------|
| Industries | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Pending |
| Services | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Pending |
| Insights | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Pending |
| Experts | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Pending |
| Offices | ⏳ | ⏳ | ⏳ | ⏳ | N/A | Pending |
| Content | ⏳ | ⏳ | ⏳ | ⏳ | N/A | Pending |
| Leads | ⏳ | N/A | N/A | N/A | N/A | Pending |
| Careers | ⏳ | ⏳ | ⏳ | ⏳ | N/A | Pending |

### Backend API Mode (USE_BACKEND=true)

| Entity | List | Create | Update | Delete | Relations | Status |
|--------|------|--------|--------|--------|-----------|--------|
| Industries | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Pending |
| Services | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Pending |
| Insights | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Pending |
| Experts | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Pending |
| Offices | ⏳ | ⏳ | ⏳ | ⏳ | N/A | Pending |
| Content | ⏳ | ⏳ | ⏳ | ⏳ | N/A | Pending |
| Leads | ⏳ | N/A | N/A | N/A | N/A | Pending |
| Careers | ⏳ | ⏳ | ⏳ | ⏳ | N/A | Pending |

---

## Test Procedure

### Setup

1. **Start Backend:**
```bash
# Ensure XAMPP Apache is running
# MySQL is running
# Database is seeded with test data
```

2. **Start Frontend:**
```bash
cd frontend
npm run dev
```

### Test Each Entity (Both Modes)

For each entity, test in this order:

#### 1. List Operation
- Navigate to admin panel
- Verify data loads
- Check console for errors
- Verify relations load (if applicable)

#### 2. Create Operation
- Click "Add" button
- Fill form with test data
- Submit
- Verify success message
- Verify new item appears in list

#### 3. Update Operation
- Click "Edit" on existing item
- Modify data
- Submit
- Verify success message
- Verify changes appear in list

#### 4. Delete Operation
- Click "Delete" on test item
- Confirm deletion
- Verify item removed from list

#### 5. Relations (if applicable)
- Create/Edit with related entities selected
- Verify relations save correctly
- Verify relations display in list

---

## Test Checklist

### Frontend API Mode (USE_BACKEND=false)

```bash
# .env.local
NEXT_PUBLIC_USE_BACKEND=false
```

- [ ] Industries: List, Create, Update, Delete, Relations
- [ ] Services: List, Create, Update, Delete, Relations
- [ ] Insights: List, Create, Update, Delete, Relations, Upload
- [ ] Experts: List, Create, Update, Delete, Relations, Upload
- [ ] Offices: List, Create, Update, Delete
- [ ] Content: List, Create, Update (key), Delete (key), Upload
- [ ] Leads: List only
- [ ] Careers: List, Create, Update, Delete

### Backend API Mode (USE_BACKEND=true)

```bash
# .env.local
NEXT_PUBLIC_USE_BACKEND=true
```

- [ ] Industries: List, Create, Update, Delete, Relations
- [ ] Services: List, Create, Update, Delete, Relations
- [ ] Insights: List, Create, Update, Delete, Relations, Upload
- [ ] Experts: List, Create, Update, Delete, Relations, Upload
- [ ] Offices: List, Create, Update, Delete
- [ ] Content: List, Create, Update (key), Delete (key), Upload
- [ ] Leads: List only
- [ ] Careers: List, Create, Update, Delete

---

## Known Issues to Watch For

### Content Entity
- ✅ **Fixed:** Now uses `key` for update/delete (backend compatible)
- **Test:** Verify update/delete work in backend mode

### Leads Entity
- **Limitation:** Read-only (getAll + create only per domain-api.ts)
- **Test:** Verify list loads, no update/delete buttons expected

### Upload Operations
- **Orchestration:** Uses `/api/upload` (not migrated)
- **Test:** Verify file uploads work in both modes

### Relations
- **Backend:** Returns nested objects (industries, services, experts, insights)
- **Frontend:** May return IDs only
- **Test:** Verify relation dropdowns populate correctly

---

## Smoke Test Automation

Run automated smoke tests:

```bash
cd frontend
npm run test:smoke
```

Expected: All 10 tests pass in both modes.

---

## Production Rollout Plan

### Phase 6.1: Validation Complete
- [ ] All manual tests pass (frontend mode)
- [ ] All manual tests pass (backend mode)
- [ ] Smoke tests pass (both modes)
- [ ] No console errors
- [ ] Performance acceptable

### Phase 6.2: Staging Deployment
- [ ] Deploy to staging environment
- [ ] Run full test suite
- [ ] Load testing
- [ ] Security audit

### Phase 6.3: Gradual Rollout
- [ ] Week 1: Enable backend for 10% of admin users
- [ ] Week 2: Enable backend for 50% of admin users
- [ ] Week 3: Enable backend for 100% of admin users
- [ ] Week 4: Monitor, fix issues

### Phase 6.4: Cleanup
- [ ] Remove frontend API routes for domain entities
- [ ] Remove feature flag (backend only)
- [ ] Update documentation
- [ ] Archive migration docs

---

## Rollback Procedure

If critical issues found:

1. **Immediate:**
```bash
# .env.local
NEXT_PUBLIC_USE_BACKEND=false
```

2. **Code Revert:**
```bash
git revert <commit-hash>
```

3. **Database Rollback:**
```bash
# Restore from backup if needed
```

---

## Success Criteria

- ✅ All CRUD operations work in both modes
- ✅ Relations load correctly in both modes
- ✅ No console errors in both modes
- ✅ Upload operations work in both modes
- ✅ Content key-based operations work in backend mode
- ✅ Performance is acceptable (< 500ms response time)
- ✅ Smoke tests pass in both modes

---

## Next Steps

1. **Manual Testing:** Complete testing matrix above
2. **Document Results:** Update this file with test results
3. **Fix Issues:** Address any bugs found during testing
4. **Staging Deploy:** Deploy to staging environment
5. **Production Rollout:** Follow gradual rollout plan

---

**Phase 6 Status:** ⏳ Testing in Progress
**Blocker:** None (code complete, ready for validation)
**Owner:** Development Team
**Timeline:** 1-2 weeks for full validation
