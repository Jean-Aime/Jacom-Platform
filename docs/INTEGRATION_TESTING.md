# Integration Testing Guide

## ✅ COMPLETED UPDATES

### Admin Pages (All Using API Client)
- ✅ Dashboard (`app/admin/page.tsx`)
- ✅ Industries (`app/admin/industries/page.tsx`)
- ✅ Content (`app/admin/content/page.tsx`)
- ✅ Experts (`app/admin/experts/page.tsx`)
- ✅ Leads (`app/admin/leads/page.tsx`) - Full CRUD
- ✅ Offices (`app/admin/offices/page.tsx`)
- ✅ Login (`app/admin/login/page.tsx`) - Auth Flow
- ✅ Layout (`app/admin/layout.tsx`) - Auth Protection

### Public Pages (Using Data Fetcher)
- ✅ Industries Detail (`app/industries/[slug]/page.tsx`)
- ✅ Services Detail (`app/services/[slug]/page.tsx`)

## 🧪 TESTING CHECKLIST

### 1. Authentication Flow
```bash
# Test login
1. Go to: http://localhost:3000/admin/login
2. Enter: admin@jacom.com / admin123
3. Should redirect to: http://localhost:3000/admin
4. Should see dashboard with stats
```

**Expected:**
- ✅ Login successful
- ✅ Redirect to dashboard
- ✅ Session persists on refresh
- ✅ Protected routes redirect to login if not authenticated

### 2. Admin Dashboard
```bash
URL: http://localhost:3000/admin
```

**Test:**
- ✅ Total leads count displays
- ✅ Stats cards render
- ✅ Charts display
- ✅ Recent activity shows

### 3. Industries Management
```bash
URL: http://localhost:3000/admin/industries
```

**Test:**
- ✅ Industries list loads from API
- ✅ Industry cards display with data
- ✅ Click "Add Industry" button (UI only)
- ✅ Edit button visible on each card

### 4. Content Management
```bash
URL: http://localhost:3000/admin/content
```

**Test:**
- ✅ Content list loads from API
- ✅ Table displays content items
- ✅ Type badges show correctly
- ✅ Edit buttons functional

### 5. Experts Directory
```bash
URL: http://localhost:3000/admin/experts
```

**Test:**
- ✅ Experts list loads from API
- ✅ Expert cards with images display
- ✅ Stats show (total experts, projects)
- ✅ Table view with all expert data

### 6. Leads Management (FULL CRUD)
```bash
URL: http://localhost:3000/admin/leads
```

**Test:**
- ✅ Leads list loads from API
- ✅ Status dropdown changes lead status (UPDATE)
- ✅ Delete button removes lead (DELETE)
- ✅ Filters work (status, region)
- ✅ Confirmation dialog on delete

**CRUD Operations:**
```javascript
// In browser console after login:
// CREATE
await fetch('http://localhost/Jacom-Platform/backend/leads', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({
    name: 'Test Lead',
    email: 'test@test.com',
    company: 'Test Co',
    message: 'Test',
    status: 'new'
  })
}).then(r => r.json())

// READ - Already tested in UI

// UPDATE - Use status dropdown in UI

// DELETE - Use delete button in UI
```

### 7. Offices Management
```bash
URL: http://localhost:3000/admin/offices
```

**Test:**
- ✅ Offices list loads from API
- ✅ Office cards display with images
- ✅ Location data shows
- ✅ "Add Office" button visible

### 8. Public Pages (Dynamic from Backend)
```bash
# Industries
URL: http://localhost:3000/industries/technology

# Services
URL: http://localhost:3000/services/digital-transformation
```

**Test:**
- ✅ Page loads data from backend (if USE_BACKEND=true)
- ✅ All sections render with dynamic data
- ✅ Related content shows
- ✅ No errors in console

## 🔧 AUTOMATED CRUD TEST

Run in browser console (after login):
```javascript
// Copy contents of: frontend/tests/crud-test.js
// Paste in browser console
// Tests all 8 resources automatically
```

## 🐛 TROUBLESHOOTING

### Issue: "Failed to fetch"
**Solution:**
1. Verify XAMPP Apache is running
2. Check backend URL: `http://localhost/Jacom-Platform/backend`
3. Test backend directly: `http://localhost/Jacom-Platform/backend`
4. Should see: `{"message":"API is running","version":"1.0"}`

### Issue: "Unauthorized" or redirect to login
**Solution:**
1. Login first at `/admin/login`
2. Check browser cookies (session should be set)
3. Verify credentials: admin@jacom.com / admin123

### Issue: Empty data
**Solution:**
1. Check database has data: `jas_consulting` database
2. Import SQL: `backend/jas_consulting.sql`
3. Verify tables exist: industries, services, leads, etc.

### Issue: CORS errors
**Solution:**
- Backend already has CORS configured in `middleware/Security.php`
- Ensure credentials: 'include' is set (already done in API client)

## 📊 TEST RESULTS TEMPLATE

```
✅ Authentication
  ✅ Login successful
  ✅ Session persists
  ✅ Auth protection works
  ✅ Logout works

✅ Admin Pages
  ✅ Dashboard loads
  ✅ Industries loads
  ✅ Content loads
  ✅ Experts loads
  ✅ Leads loads (with CRUD)
  ✅ Offices loads

✅ CRUD Operations
  ✅ CREATE lead
  ✅ READ all resources
  ✅ UPDATE lead status
  ✅ DELETE lead

✅ Public Pages
  ✅ Industries detail page
  ✅ Services detail page
  ✅ Data loads from backend

✅ Error Handling
  ✅ Invalid login shows error
  ✅ Network errors handled
  ✅ 404 pages work
```

## 🚀 NEXT STEPS

1. **Test all endpoints** using browser console script
2. **Verify CRUD** on leads page (create, update, delete)
3. **Check public pages** load dynamic data
4. **Test authentication** flow completely
5. **Document any issues** found

## 📝 MANUAL TEST SCRIPT

```bash
# 1. Start Backend
# Ensure XAMPP Apache is running

# 2. Start Frontend
cd frontend
npm run dev

# 3. Test Login
# Go to: http://localhost:3000/admin/login
# Login with: admin@jacom.com / admin123

# 4. Test Each Admin Page
# Click through all sidebar links
# Verify data loads on each page

# 5. Test CRUD on Leads
# Go to: http://localhost:3000/admin/leads
# Change a lead status (UPDATE)
# Delete a lead (DELETE)
# Verify changes persist

# 6. Test Public Pages
# Go to: http://localhost:3000/industries/technology
# Verify data loads from backend
# Check console for errors

# 7. Run Automated Test
# Open browser console
# Paste contents of: frontend/tests/crud-test.js
# Review results
```

## ✨ SUCCESS CRITERIA

All tests pass when:
- ✅ Login works and redirects to dashboard
- ✅ All admin pages load data from API
- ✅ Leads CRUD operations work (create, read, update, delete)
- ✅ Public pages load dynamic data from backend
- ✅ No console errors
- ✅ Auth protection works (redirects to login when not authenticated)
