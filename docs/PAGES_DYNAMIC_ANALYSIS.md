# Public Pages - Dynamic vs Static Analysis

## Summary

**Total Public Pages:** 20
- **Already Dynamic:** 7 pages ✅
- **Should Be Dynamic:** 4 pages ⚠️
- **Should Stay Static:** 9 pages ✓

---

## ✅ ALREADY DYNAMIC (7 Pages)

### 1. **Home** (`/`)
- **Status:** ✅ Dynamic
- **Data Source:** Prisma (fetches latest 3 insights)
- **Why:** Displays latest insights dynamically

### 2. **Industries Listing** (`/industries`)
- **Status:** ✅ Dynamic
- **Data Source:** Backend API
- **Why:** Lists all industries from database

### 3. **Industry Detail** (`/industries/[slug]`)
- **Status:** ✅ Dynamic
- **Data Source:** Backend API
- **Why:** Shows individual industry data

### 4. **Services Listing** (`/services`)
- **Status:** ✅ Dynamic
- **Data Source:** Backend API
- **Why:** Lists all services from database

### 5. **Service Detail** (`/services/[slug]`)
- **Status:** ✅ Dynamic
- **Data Source:** Backend API
- **Why:** Shows individual service data

### 6. **Insights Listing** (`/insights`)
- **Status:** ✅ Dynamic
- **Data Source:** Prisma
- **Why:** Lists all published insights

### 7. **Insight Detail** (`/insights/[slug]`)
- **Status:** ✅ Dynamic
- **Data Source:** Prisma
- **Why:** Shows individual insight content

---

## ⚠️ SHOULD BE DYNAMIC (4 Pages)

### 1. **Experts Listing** (`/experts`)
- **Current:** Static (hardcoded)
- **Should Be:** Dynamic from database
- **Reason:** Experts are in database, should fetch from `Expert` table
- **Priority:** HIGH

### 2. **Expert Detail** (`/experts/[slug]`)
- **Current:** Static (hardcoded)
- **Should Be:** Dynamic from database
- **Reason:** Expert profiles stored in database
- **Priority:** HIGH

### 3. **Offices Listing** (`/offices`)
- **Current:** Static (hardcoded)
- **Should Be:** Dynamic from database
- **Reason:** Offices are in database, should fetch from `Office` table
- **Priority:** MEDIUM

### 4. **Office Detail** (`/offices/[slug]`)
- **Current:** Static (hardcoded)
- **Should Be:** Dynamic from database
- **Reason:** Office details stored in database
- **Priority:** MEDIUM

---

## ✓ SHOULD STAY STATIC (9 Pages)

### 1. **About** (`/about`)
- **Status:** ✓ Static
- **Why:** Company information rarely changes
- **Content:** Heritage, values, leadership, global presence
- **Update Method:** Manual code updates when needed

### 2. **Academy** (`/academy`)
- **Status:** ✓ Static
- **Why:** Training programs are fixed offerings
- **Content:** Course descriptions, enrollment process
- **Update Method:** Manual updates for new programs

### 3. **Community** (`/community`)
- **Status:** ✓ Hybrid (fetches insights but layout is static)
- **Why:** Page structure is fixed, only insights are dynamic
- **Content:** Success stories, research papers, categories
- **Update Method:** Insights dynamic, rest static

### 4. **Solutions** (`/solutions`)
- **Status:** ✓ Static
- **Why:** Service categories are fixed
- **Content:** Consulting, technical, financial solutions
- **Update Method:** Manual updates for new solution categories

### 5. **Contact** (`/contact`)
- **Status:** ✓ Static
- **Why:** Contact information changes rarely
- **Content:** Form, office addresses, consultation booking
- **Update Method:** Manual updates for office changes

### 6. **Privacy** (`/privacy`)
- **Status:** ✓ Static
- **Why:** Legal document, changes infrequently
- **Content:** Privacy policy text
- **Update Method:** Manual updates for policy changes

### 7. **Search** (`/search`)
- **Status:** ✓ Dynamic (search functionality)
- **Why:** Searches across all content types
- **Content:** Search results from database
- **Note:** Correctly implemented as dynamic

### 8. **Case Studies Listing** (`/case-studies`)
- **Status:** ✓ Static (placeholder)
- **Why:** No case studies in database yet
- **Future:** Should become dynamic when case studies added
- **Priority:** LOW (future feature)

### 9. **Case Study Detail** (`/case-studies/[slug]`)
- **Status:** ✓ Static (placeholder)
- **Why:** No case studies in database yet
- **Future:** Should become dynamic when case studies added
- **Priority:** LOW (future feature)

---

## Database Tables Reference

### Existing Tables with Data:
- ✅ `Industry` - Used by industries pages
- ✅ `Service` - Used by services pages
- ✅ `Insight` - Used by insights pages
- ✅ `Expert` - **NOT USED** (should be used by experts pages)
- ✅ `Office` - **NOT USED** (should be used by offices pages)
- ✅ `Lead` - Used by contact form
- ✅ `ContentBlock` - Used by admin for dynamic content

### Tables Without Implementation:
- ⚠️ `Career` - No careers page exists
- ⚠️ `MediaItem` - No media page exists
- ⚠️ Case studies - No table exists yet

---

## Action Items

### HIGH Priority (Immediate)
1. **Convert Experts pages to dynamic**
   - Update `/experts/page.tsx` to fetch from database
   - Update `/experts/[slug]/page.tsx` to fetch expert by slug
   - Ensure expert data exists in database

2. **Convert Offices pages to dynamic**
   - Update `/offices/page.tsx` to fetch from database
   - Update `/offices/[slug]/page.tsx` to fetch office by slug
   - Ensure office data exists in database

### MEDIUM Priority (Future)
3. **Add Careers functionality**
   - Create `/careers` page (dynamic)
   - Create `/careers/[slug]` page (dynamic)
   - Use existing `Career` and `Application` tables

4. **Add Case Studies functionality**
   - Create case study database table
   - Convert case studies pages to dynamic
   - Add admin management for case studies

### LOW Priority (Optional)
5. **Content Management System**
   - Use `ContentBlock` table for more pages
   - Allow admin to edit static content
   - Reduce need for code changes

---

## Implementation Guide

### For Experts Pages:

**File:** `frontend/app/experts/page.tsx`
```typescript
import { prisma } from "@/lib/prisma";

export default async function ExpertsPage() {
  const experts = await prisma.expert.findMany({
    where: { featured: true },
    orderBy: { name: 'asc' }
  });
  
  // Render experts dynamically
}
```

**File:** `frontend/app/experts/[slug]/page.tsx`
```typescript
import { prisma } from "@/lib/prisma";

export default async function ExpertDetailPage({ params }) {
  const expert = await prisma.expert.findUnique({
    where: { slug: params.slug },
    include: { insights: true, industries: true, services: true }
  });
  
  // Render expert details
}
```

### For Offices Pages:

**File:** `frontend/app/offices/page.tsx`
```typescript
import { prisma } from "@/lib/prisma";

export default async function OfficesPage() {
  const offices = await prisma.office.findMany({
    orderBy: { region: 'asc' }
  });
  
  // Render offices dynamically
}
```

**File:** `frontend/app/offices/[slug]/page.tsx`
```typescript
import { prisma } from "@/lib/prisma";

export default async function OfficeDetailPage({ params }) {
  const office = await prisma.office.findUnique({
    where: { slug: params.slug }
  });
  
  // Render office details
}
```

---

## Conclusion

**Current State:**
- 7 pages properly dynamic ✅
- 4 pages need conversion ⚠️
- 9 pages correctly static ✓

**Next Steps:**
1. Convert experts pages (HIGH)
2. Convert offices pages (HIGH)
3. Plan careers functionality (MEDIUM)
4. Plan case studies functionality (MEDIUM)

**Platform Health:** 65% complete for dynamic content implementation
