# CASE STUDIES DATA SETUP GUIDE

## QUICK SETUP

### Option 1: Run Batch File (Easiest)
```bash
# From project root
seed_case_studies.bat
```

### Option 2: Manual via phpMyAdmin
1. Open http://localhost/phpmyadmin
2. Select `jas_consulting` database
3. Click "SQL" tab
4. Copy entire content from `backend/migrations/seed_case_studies.sql`
5. Paste and click "Go"

## WHAT GETS CREATED

### 5 Case Studies from MD File:

1. **Smart Factory Implementation**
   - Company: Manufacturing Company
   - Industry: Manufacturing
   - Results: 40% efficiency, 30% defect reduction, $2M savings
   - Featured: Yes

2. **Renewable Energy System Design**
   - Company: Energy Company
   - Industry: Energy & Utilities
   - Results: 500+ installations, 50% cost reduction
   - Featured: Yes

3. **Nepal-Japan Recruitment Program**
   - Company: Hospitality Group
   - Industry: Hospitality & Tourism
   - Results: 200+ placements, 95% retention
   - Featured: Yes

4. **Tax Management Empowerment**
   - Company: Public Sector Organization
   - Industry: Financial Services
   - Results: 100% compliance, 60% time reduction
   - Featured: No

5. **Web Development Training Program**
   - Company: Career Transition Candidates
   - Industry: Education & Training
   - Results: 85% completion, 90% placement, 150% salary increase
   - Featured: No

## VERIFY SETUP

### 1. Check Database
```sql
SELECT COUNT(*) FROM CaseStudy;
-- Should return: 5
```

### 2. Test Backend API
Visit: http://localhost/Jacom-Platform/backend/case-studies
**Expected**: JSON array with 5 case studies

### 3. Test Frontend
Visit: http://localhost:3000/case-studies
**Expected**: Grid showing 5 case study cards

### 4. Test Admin Panel
Visit: http://localhost:3000/admin/case-studies
**Expected**: List of 5 case studies with edit/delete options

## FULL CRUD OPERATIONS

### Create New Case Study
1. Go to `/admin/case-studies`
2. Fill in form:
   - Title (required)
   - Slug (required, URL-friendly)
   - Company (required)
   - Industry (optional)
   - Challenge (required)
   - Solution (required)
   - Results (required)
   - Quote (optional)
   - Author & Role (optional)
   - Image URL (optional)
   - Featured toggle
   - Status (published/draft)
3. Click "Create"

### Edit Case Study
1. Go to `/admin/case-studies`
2. Click "Edit" on any case study
3. Modify fields
4. Click "Update"

### Delete Case Study
1. Go to `/admin/case-studies`
2. Click "Delete" on any case study
3. Confirm deletion

## API ENDPOINTS

### GET All Case Studies
```
GET /case-studies
Response: Array of published case studies
```

### GET Single Case Study
```
GET /case-studies/{slug}
Response: Single case study object
```

### POST Create Case Study
```
POST /case-studies
Body: {
  title, slug, company, industry,
  challenge, solution, results,
  quote, author, authorRole, image,
  featured, status
}
```

### PUT Update Case Study
```
PUT /case-studies/{id}
Body: Same as POST
```

### DELETE Case Study
```
DELETE /case-studies/{id}
```

## FRONTEND FEATURES

### Case Studies Page (/case-studies)
- Hero section with gradient
- Grid layout (3 columns on desktop)
- Featured badges
- Industry tags
- Hover effects
- Empty state with CTA
- Professional CTA section

### Individual Case Study (/case-studies/[slug])
- Full case study detail
- Challenge/Solution/Results sections
- Quote display
- Author information
- Related case studies

### Admin Panel (/admin/case-studies)
- Two-column layout
- Form on left (create/edit)
- List on right (existing)
- Real-time updates
- Status indicators
- Featured badges

## TROUBLESHOOTING

### Case Studies Not Showing
1. Check database: `SELECT * FROM CaseStudy;`
2. Verify backend API: http://localhost/Jacom-Platform/backend/case-studies
3. Check browser console for errors
4. Ensure XAMPP Apache & MySQL are running

### API Returns Empty Array
- Database table might be empty
- Run `seed_case_studies.bat` again
- Check status field (only 'published' shown on frontend)

### Admin Panel Not Working
- Verify you're logged in: http://localhost:3000/admin/login
- Credentials: admin@jas.com / admin123
- Check browser console for API errors

## SAMPLE DATA STRUCTURE

```json
{
  "id": "cs1",
  "title": "Smart Factory Implementation",
  "slug": "smart-factory-implementation",
  "company": "Manufacturing Company",
  "industry": "Manufacturing",
  "challenge": "Low production efficiency...",
  "solution": "Deployed IoT sensor network...",
  "results": "40% efficiency improvement...",
  "quote": "The IoT implementation...",
  "author": "Operations Director",
  "authorRole": "Manufacturing Company",
  "image": "https://images.unsplash.com/...",
  "featured": true,
  "status": "published"
}
```

## NEXT STEPS

1. **Add More Case Studies** - Use admin panel
2. **Customize Images** - Replace Unsplash URLs with your images
3. **Add Detail Pages** - Create `/case-studies/[slug]/page.tsx`
4. **Add Filters** - Filter by industry, featured, etc.
5. **Add Search** - Search case studies by title/company

## SUPPORT

For issues:
1. Check this guide
2. Verify XAMPP services running
3. Check database connection
4. Review browser console
5. Check backend logs
