# Phase 6: Quick Test Script

## Quick Validation Commands

### 1. Check Environment
```bash
# Verify backend is running
curl http://localhost/Jacom-Platform/backend/health

# Verify frontend is running
curl http://localhost:3000

# Check current mode
cat frontend/.env.local | grep USE_BACKEND
```

### 2. Test Backend API Directly
```bash
# Test industries endpoint
curl http://localhost/Jacom-Platform/backend/industries

# Test services endpoint
curl http://localhost/Jacom-Platform/backend/services

# Test insights endpoint
curl http://localhost/Jacom-Platform/backend/insights

# Test experts endpoint
curl http://localhost/Jacom-Platform/backend/experts

# Test offices endpoint
curl http://localhost/Jacom-Platform/backend/offices

# Test content endpoint
curl http://localhost/Jacom-Platform/backend/content

# Test leads endpoint
curl http://localhost/Jacom-Platform/backend/leads

# Test careers endpoint
curl http://localhost/Jacom-Platform/backend/careers
```

### 3. Switch Modes

**Frontend Mode:**
```bash
cd frontend
echo "NEXT_PUBLIC_USE_BACKEND=false" > .env.local
echo "NEXT_PUBLIC_BACKEND_URL=http://localhost/Jacom-Platform/backend" >> .env.local
npm run dev
```

**Backend Mode:**
```bash
cd frontend
echo "NEXT_PUBLIC_USE_BACKEND=true" > .env.local
echo "NEXT_PUBLIC_BACKEND_URL=http://localhost/Jacom-Platform/backend" >> .env.local
npm run dev
```

### 4. Run Smoke Tests
```bash
cd frontend
npm run test:smoke
```

### 5. Browser Console Test
Open browser console and run:
```javascript
// Check which mode is active
console.log('Backend Mode:', process.env.NEXT_PUBLIC_USE_BACKEND);

// Test domain API directly
const testAPI = async () => {
  const { domainAPI } = await import('./lib/domain-api');
  
  // Test industries
  const industries = await domainAPI.getIndustries();
  console.log('Industries:', industries);
  
  // Test services
  const services = await domainAPI.getServices();
  console.log('Services:', services);
};

testAPI();
```

---

## Quick Test Checklist

### Frontend Mode (5 min)
- [ ] Open http://localhost:3000/admin/industries
- [ ] Verify list loads
- [ ] Create test item
- [ ] Edit test item
- [ ] Delete test item
- [ ] No console errors

### Backend Mode (5 min)
- [ ] Switch to backend mode
- [ ] Refresh browser
- [ ] Open http://localhost:3000/admin/industries
- [ ] Verify list loads
- [ ] Create test item
- [ ] Edit test item
- [ ] Delete test item
- [ ] No console errors

### Critical Path (10 min)
Test most important entities in both modes:
- [ ] Industries (has relations)
- [ ] Services (has relations)
- [ ] Insights (has relations + upload)
- [ ] Content (uses key not id)

---

## Expected Results

### Frontend Mode
- All operations use `/api/*` endpoints
- Network tab shows: `http://localhost:3000/api/industries`
- Response format: JSON array/object

### Backend Mode
- All operations use backend endpoints
- Network tab shows: `http://localhost/Jacom-Platform/backend/industries`
- Response format: JSON array/object with relations

---

## Common Issues & Fixes

### Issue: CORS errors in backend mode
**Fix:** Check backend CORS headers in `backend/index.php`

### Issue: 404 errors in backend mode
**Fix:** Verify Apache mod_rewrite is enabled, check `.htaccess`

### Issue: Relations not loading
**Fix:** Check backend controller includes relations in response

### Issue: Content update/delete fails in backend mode
**Fix:** Verify using `key` parameter, not `id`

### Issue: Upload fails
**Fix:** Upload uses `/api/upload` (orchestration), should work in both modes

---

## Performance Benchmarks

### Target Response Times
- List operations: < 200ms
- Create operations: < 300ms
- Update operations: < 300ms
- Delete operations: < 200ms

### Test with Browser DevTools
1. Open Network tab
2. Perform operation
3. Check response time
4. Verify < target

---

## Test Data Cleanup

After testing, clean up test data:

```sql
-- Delete test industries
DELETE FROM industries WHERE name LIKE 'Test%';

-- Delete test services
DELETE FROM services WHERE name LIKE 'Test%';

-- Delete test insights
DELETE FROM insights WHERE title LIKE 'Test%';

-- Delete test experts
DELETE FROM experts WHERE name LIKE 'Test%';

-- Delete test offices
DELETE FROM offices WHERE name LIKE 'Test%';

-- Delete test content
DELETE FROM content WHERE key LIKE 'test%';

-- Delete test careers
DELETE FROM careers WHERE title LIKE 'Test%';
```

---

**Quick Test Duration:** ~30 minutes
**Full Test Duration:** ~2 hours
**Recommended:** Start with quick test, then full validation
