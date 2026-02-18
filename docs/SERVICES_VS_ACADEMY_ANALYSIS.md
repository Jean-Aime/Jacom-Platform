# Services vs Academy Pages - Dynamic Analysis

## Your Understanding is CORRECT ✅

You identified a critical overlap between **Services** and **Academy** pages.

---

## Current Situation

### **Services Page** (`/services`)
- **Status:** ❌ Static (hardcoded industries)
- **Content:** Shows 6 hardcoded industry solutions
- **Problem:** Not using Service table from database
- **Should Be:** Dynamic listing of all services from database

### **Service Detail** (`/services/[slug]`)
- **Status:** ✅ Dynamic (fetches from database)
- **Content:** Shows individual service with capabilities, process, metrics
- **Correct:** Already properly implemented

### **Academy Page** (`/academy`)
- **Status:** ❌ Static (hardcoded training programs)
- **Content:** Shows 5 hardcoded training programs:
  1. Web Development Bootcamp
  2. 5-Day Cooking Training
  3. Japanese Language (JLPT)
  4. Cultural Orientation
  5. Executive Coaching
- **Problem:** These are actually SERVICES but displayed as static content

---

## The Overlap Problem

### Training Services in Database:
Looking at your services, you have:
- **Web Development Training** (service)
- **Recruitment & Training Services** (service)
- **Professional Skills** (service)

### Training Programs on Academy Page:
- Web Development Bootcamp
- Cooking Training
- Japanese Language
- Executive Coaching

**These are the SAME thing but in different places!**

---

## Correct Architecture

### **Services Table Structure:**
```
Service {
  - id
  - name
  - slug
  - type (consulting, technical, training, financial)
  - category (web-dev, cooking, language, executive)
  - description
  - featured
  - upcoming (boolean for upcoming programs)
  - startDate (for scheduled programs)
  - duration
  - price
  - capacity
  - status (published, draft, upcoming, completed)
}
```

### **How It Should Work:**

#### 1. **Services Page** (`/services`)
- **Dynamic:** Fetch ALL services from database
- **Filter by type:** Show consulting, technical, financial services
- **Exclude:** Training services (those go to Academy)

#### 2. **Academy Page** (`/academy`)
- **Dynamic:** Fetch services WHERE type = 'training'
- **Show:** Upcoming programs, enrollment info, schedules
- **Features:**
  - Upcoming training sessions
  - Past programs (completed)
  - Enrollment status (open/closed)
  - Start dates, duration, pricing
  - Student testimonials

#### 3. **Service Detail** (`/services/[slug]`)
- **Already Dynamic:** ✅ Correct
- **Shows:** Full service details regardless of type

---

## Database Schema Recommendation

### Add to Service Table:
```sql
ALTER TABLE Service ADD COLUMN type ENUM('consulting', 'technical', 'training', 'financial') DEFAULT 'consulting';
ALTER TABLE Service ADD COLUMN category VARCHAR(50);
ALTER TABLE Service ADD COLUMN upcoming BOOLEAN DEFAULT 0;
ALTER TABLE Service ADD COLUMN startDate DATETIME;
ALTER TABLE Service ADD COLUMN duration VARCHAR(50);
ALTER TABLE Service ADD COLUMN price VARCHAR(50);
ALTER TABLE Service ADD COLUMN capacity INT;
ALTER TABLE Service ADD COLUMN enrollmentStatus ENUM('open', 'closed', 'full') DEFAULT 'open';
```

### Example Data:
```sql
-- Training Services
INSERT INTO Service (name, slug, type, category, upcoming, startDate, duration, price) VALUES
('Web Development Bootcamp', 'web-development-bootcamp', 'training', 'web-dev', 1, '2025-03-01', '12 weeks', '¥1,200'),
('5-Day Cooking Training', 'cooking-training', 'training', 'hospitality', 1, '2025-02-15', '5 days', 'NPR 45,000'),
('JLPT N5 Preparation', 'jlpt-n5', 'training', 'language', 1, '2025-02-01', '3 months', '¥800'),
('Executive Coaching', 'executive-coaching', 'training', 'leadership', 0, NULL, 'Ongoing', 'Custom');

-- Consulting Services
INSERT INTO Service (name, slug, type, category) VALUES
('Digital Transformation', 'digital-transformation', 'consulting', 'strategy'),
('IoT Platform Integration', 'iot-platform', 'technical', 'iot');
```

---

## Implementation Plan

### HIGH Priority (Immediate)

#### 1. **Update Services Page to Dynamic**
**File:** `frontend/app/services/page.tsx`

```typescript
import { prisma } from "@/lib/prisma";

export default async function ServicesPage() {
  // Fetch non-training services
  const services = await prisma.service.findMany({
    where: {
      status: 'published',
      type: { not: 'training' } // Exclude training
    },
    orderBy: { featured: 'desc' }
  });
  
  // Group by type
  const consulting = services.filter(s => s.type === 'consulting');
  const technical = services.filter(s => s.type === 'technical');
  const financial = services.filter(s => s.type === 'financial');
  
  // Render dynamically
}
```

#### 2. **Update Academy Page to Dynamic**
**File:** `frontend/app/academy/page.tsx`

```typescript
import { prisma } from "@/lib/prisma";

export default async function AcademyPage() {
  // Fetch training services
  const programs = await prisma.service.findMany({
    where: {
      status: 'published',
      type: 'training'
    },
    orderBy: [
      { upcoming: 'desc' },
      { startDate: 'asc' }
    ]
  });
  
  const upcomingPrograms = programs.filter(p => p.upcoming);
  const ongoingPrograms = programs.filter(p => !p.upcoming);
  
  // Render dynamically with enrollment info
}
```

---

## Benefits of This Approach

### 1. **Single Source of Truth**
- All services (including training) in one database table
- No duplication between Services and Academy pages
- Easy to manage from admin panel

### 2. **Dynamic Content**
- Admin can add/edit training programs without code changes
- Automatic updates to Academy page
- Real-time enrollment status

### 3. **Better User Experience**
- Users see upcoming training sessions
- Clear enrollment information
- Consistent service presentation

### 4. **Scalability**
- Easy to add new training categories
- Support for recurring programs
- Track enrollment and capacity

---

## Admin Panel Integration

### Add to Admin Panel:
- **Services Management** (already exists)
  - Add "Type" field (consulting, technical, training, financial)
  - Add "Upcoming" toggle for training
  - Add "Start Date", "Duration", "Price" fields
  - Add "Enrollment Status" field

### Training-Specific Fields:
- Start Date
- Duration
- Price
- Capacity
- Enrollment Status
- Prerequisites
- Certification

---

## Careers Page (Bonus)

You also have a **CareersController** but no careers page!

### Should Add:
- `/careers` - List all job openings (dynamic)
- `/careers/[slug]` - Job detail page (dynamic)
- Use existing Career table and controller

---

## Summary

### Current State:
- ❌ Services page is static (should be dynamic)
- ❌ Academy page is static (should be dynamic)
- ✅ Service detail page is dynamic (correct)
- ❌ Training programs duplicated in code

### Should Be:
- ✅ Services page dynamic (fetch non-training services)
- ✅ Academy page dynamic (fetch training services)
- ✅ Service detail page dynamic (already correct)
- ✅ Single source of truth in database

### Action Items:
1. Add `type` column to Service table
2. Update Services page to fetch from database
3. Update Academy page to fetch training services
4. Add training-specific fields to Service table
5. Update admin panel to manage training programs

**Priority:** HIGH - This is a core platform feature

---

## Your Understanding: 100% CORRECT ✅

You correctly identified that:
1. Academy should be dynamic (training programs)
2. Services and Academy have overlapping content
3. Training programs should come from database
4. Academy should showcase upcoming programs

**Excellent analysis!** 🎯
