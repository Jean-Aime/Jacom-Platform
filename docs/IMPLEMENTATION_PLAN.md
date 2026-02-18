# Dynamic Pages Implementation Plan

## Pages to Update

### ✅ Already Dynamic (No Changes Needed)
1. Home (`/`) - Fetches insights
2. Industries listing (`/industries`) - Fetches from DB
3. Industry detail (`/industries/[slug]`) - Fetches from DB
4. Services listing (`/services`) - **NEEDS FIX** (currently static)
5. Service detail (`/services/[slug]`) - Fetches from DB
6. Insights listing (`/insights`) - Fetches from DB
7. Insight detail (`/insights/[slug]`) - Fetches from DB
8. Experts listing (`/experts`) - Fetches from DB
9. Expert detail (`/experts/[slug]`) - Fetches from DB
10. Search (`/search`) - Dynamic search
11. Community (`/community`) - Fetches insights

### ⚠️ Need to Make Dynamic
1. **Services listing** (`/services`) - Currently shows hardcoded industries
2. **Academy** (`/academy`) - Currently shows hardcoded training programs
3. **Offices listing** (`/offices`) - Currently static
4. **Office detail** (`/offices/[slug]`) - Currently static

### ✓ Should Stay Static
1. About (`/about`) - Company info
2. Solutions (`/solutions`) - Service categories overview
3. Contact (`/contact`) - Contact form
4. Privacy (`/privacy`) - Legal document

---

## Implementation Tasks

### Task 1: Fix Services Listing Page ⚠️ HIGH
**File:** `frontend/app/services/page.tsx`
**Current:** Shows 6 hardcoded industries
**Should:** Fetch all services from database, group by type
**Design:** Keep exact same layout

### Task 2: Make Academy Page Dynamic ⚠️ HIGH
**File:** `frontend/app/academy/page.tsx`
**Current:** Shows 5 hardcoded training programs
**Should:** Fetch services WHERE type = 'training'
**Design:** Keep exact same layout
**Database:** Add `type` field to Service table

### Task 3: Make Industry Services Clickable ⚠️ HIGH
**File:** `frontend/app/industries/[slug]/page.tsx`
**Current:** Services shown but not clickable
**Should:** Add links to service detail pages
**Design:** Keep exact same layout, just add links

### Task 4: Make Offices Pages Dynamic ⚠️ MEDIUM
**Files:** 
- `frontend/app/offices/page.tsx`
- `frontend/app/offices/[slug]/page.tsx`
**Current:** Static/placeholder
**Should:** Fetch from Office table
**Design:** Keep exact same layout

---

## Database Changes Needed

### Add to Service Table:
```sql
ALTER TABLE Service 
ADD COLUMN type ENUM('consulting', 'technical', 'training', 'financial') DEFAULT 'consulting',
ADD COLUMN category VARCHAR(50),
ADD COLUMN upcoming BOOLEAN DEFAULT 0,
ADD COLUMN startDate DATETIME,
ADD COLUMN duration VARCHAR(50),
ADD COLUMN price VARCHAR(50),
ADD COLUMN capacity INT,
ADD COLUMN enrollmentStatus ENUM('open', 'closed', 'full') DEFAULT 'open';
```

### Update Existing Services:
```sql
-- Mark training services
UPDATE Service SET type = 'training' WHERE slug IN ('web-development-training', 'recruitment-training');

-- Mark consulting services
UPDATE Service SET type = 'consulting' WHERE slug LIKE '%consulting%';

-- Mark technical services
UPDATE Service SET type = 'technical' WHERE slug IN ('iot-platform', 'smart-factory');
```

---

## Admin Panel Updates Needed

### Services Management (Already Exists)
**Add Fields:**
- Type dropdown (consulting, technical, training, financial)
- Category input
- Upcoming toggle (for training)
- Start Date (for training)
- Duration (for training)
- Price (for training)
- Capacity (for training)
- Enrollment Status (for training)

### Offices Management (Needs Creation)
**Create:** `/admin/offices` page
**Features:**
- List all offices
- Add/Edit/Delete offices
- Manage: name, region, country, city, address, phone, email, lat, lng, image

---

## API Endpoints Status

### ✅ Already Exist:
- `/api/industries` - Industries CRUD
- `/api/services` - Services CRUD
- `/api/insights` - Insights CRUD
- `/api/experts` - Experts CRUD
- `/api/leads` - Contact form submissions
- `/api/content` - Dynamic content blocks

### ⚠️ Need Updates:
- `/api/services` - Add filtering by type
- `/api/offices` - Already exists in backend controller

### Backend Controllers:
- ✅ IndustriesController.php
- ✅ ServicesController.php
- ✅ InsightsController.php
- ✅ ExpertsController.php
- ✅ OfficesController.php
- ✅ LeadsController.php
- ✅ ContentController.php
- ✅ CareersController.php (not used yet)

---

## Execution Order

### Phase 1: Database Updates (5 min)
1. Add type field to Service table
2. Update existing services with correct types
3. Verify Office table has data

### Phase 2: Fix Services Page (10 min)
1. Update `/services/page.tsx` to fetch from DB
2. Group services by type
3. Keep exact same design

### Phase 3: Make Academy Dynamic (15 min)
1. Update `/academy/page.tsx` to fetch training services
2. Keep exact same design
3. Add dynamic enrollment info

### Phase 4: Make Services Clickable (5 min)
1. Update `/industries/[slug]/page.tsx`
2. Add links to service cards
3. Keep exact same design

### Phase 5: Make Offices Dynamic (15 min)
1. Update `/offices/page.tsx` to fetch from DB
2. Update `/offices/[slug]/page.tsx` to fetch from DB
3. Keep exact same design

### Phase 6: Admin Panel Updates (20 min)
1. Add type field to services management
2. Add training-specific fields
3. Create offices management page (if needed)

---

## Design Preservation Rules

### CRITICAL:
- ✅ Keep ALL existing CSS classes
- ✅ Keep ALL existing HTML structure
- ✅ Keep ALL existing animations
- ✅ Keep ALL existing colors/spacing
- ✅ Only change: hardcoded data → database data
- ✅ Only add: clickable links where needed

### Example:
**Before (Static):**
```tsx
<div className="bg-white rounded-xl p-6">
  <h3>Web Development Training</h3>
  <p>Learn full-stack development</p>
</div>
```

**After (Dynamic):**
```tsx
{services.map(service => (
  <a href={`/services/${service.slug}`} className="bg-white rounded-xl p-6 hover:shadow-lg transition block">
    <h3>{service.name}</h3>
    <p>{service.description}</p>
  </a>
))}
```

---

## Testing Checklist

### After Each Update:
- [ ] Page loads without errors
- [ ] Design looks identical
- [ ] Data displays correctly
- [ ] Links work properly
- [ ] Responsive design intact
- [ ] Animations still work
- [ ] No console errors

---

## Rollback Plan

### If Issues Occur:
1. Keep original files as `.backup`
2. Can revert immediately
3. Database changes are additive (safe)

---

## Timeline

**Total Estimated Time:** 70 minutes

- Database updates: 5 min
- Services page: 10 min
- Academy page: 15 min
- Industry links: 5 min
- Offices pages: 15 min
- Admin updates: 20 min

**Ready to execute?**
