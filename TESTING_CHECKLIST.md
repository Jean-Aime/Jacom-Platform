# COMPLETE TESTING CHECKLIST - ALL PHASES

## PHASE 1: CROSS-LINKING SYSTEM

### Test 1.1: Create Industry with Relationships
- [ ] Go to http://localhost:3000/admin/industries
- [ ] Click "+ Add Industry"
- [ ] Fill in: Name, Slug, Description, Overview
- [ ] In Cross-Linking section:
  - [ ] Select 2-3 services
  - [ ] Select 2-3 experts
  - [ ] Select 2-3 insights
- [ ] Click "Create"
- [ ] Verify success message
- [ ] Go to http://localhost:3000/industries/[slug]
- [ ] Verify related services appear in sidebar
- [ ] Verify related experts appear in sidebar
- [ ] Verify related insights appear at bottom

### Test 1.2: Create Service with Relationships
- [ ] Go to http://localhost:3000/admin/services
- [ ] Click "+ Add Service"
- [ ] Fill in basic info
- [ ] In Cross-Linking section:
  - [ ] Select 2-3 industries
  - [ ] Select 2-3 experts
  - [ ] Select 2-3 insights
- [ ] Click "Create"
- [ ] Go to http://localhost:3000/services/[slug]
- [ ] Verify all related content appears

### Test 1.3: Bidirectional Linking
- [ ] Link Industry A to Service B
- [ ] Go to Service B detail page
- [ ] Verify Industry A appears in "Related Industries"
- [ ] Confirms bidirectional relationship works

### Test 1.4: Expert Relationships
- [ ] Go to http://localhost:3000/admin/experts
- [ ] Create/edit expert
- [ ] Select related industries and services
- [ ] Save
- [ ] Visit expert detail page
- [ ] Verify industries and services appear

### Test 1.5: Insight Relationships
- [ ] Go to http://localhost:3000/admin/insights
- [ ] Create/edit insight
- [ ] Select related industries and services
- [ ] Save
- [ ] Visit insight detail page
- [ ] Verify related industries and services appear

---

## PHASE 2: ADVANCED SEARCH & FILTERS

### Test 2.1: Basic Search
- [ ] Go to http://localhost:3000/search
- [ ] Type "digital" in search box
- [ ] Verify results appear
- [ ] Verify keyword "digital" is highlighted in yellow

### Test 2.2: Content Type Filter
- [ ] Search for "transformation"
- [ ] Click "insight" in Content Type filter
- [ ] Verify only insights are shown
- [ ] Verify URL contains ?q=transformation&type=insight
- [ ] Verify result count updates

### Test 2.3: Industry Filter
- [ ] Search for "strategy"
- [ ] Select an industry from filter
- [ ] Verify results are filtered to that industry
- [ ] Verify URL updates with industry parameter

### Test 2.4: Multiple Filters
- [ ] Search for "innovation"
- [ ] Select type: "insight"
- [ ] Select industry: "Healthcare"
- [ ] Select region: "North America"
- [ ] Verify all filters are applied
- [ ] Verify URL contains all parameters
- [ ] Copy URL and open in new tab
- [ ] Verify filters are preserved

### Test 2.5: Clear Filters
- [ ] Apply multiple filters
- [ ] Click "Clear all"
- [ ] Verify filters reset
- [ ] Verify URL updates

### Test 2.6: Filter Counts
- [ ] Search for "digital"
- [ ] Check Content Type filter
- [ ] Verify counts next to each type (e.g., "insight (12)")
- [ ] Select a filter
- [ ] Verify counts update

### Test 2.7: Empty Results
- [ ] Search for "xyz123nonexistent"
- [ ] Verify "No results found" message
- [ ] Verify filters still show

---

## PHASE 3: GATED CONTENT + LEAD CAPTURE

### Test 3.1: Gated Content Download
- [ ] Create insight with gated=true and downloadUrl
- [ ] Visit insight page
- [ ] Verify email gate form appears
- [ ] Fill out form:
  - Name: John Doe
  - Email: john@acmecorp.com
  - Company: Acme Corp
  - Job Title: VP Marketing
- [ ] Click "Download Report"
- [ ] Verify content unlocks
- [ ] Verify download starts

### Test 3.2: Lead Appears in Admin
- [ ] Go to http://localhost:3000/admin/leads
- [ ] Verify lead appears in table
- [ ] Verify lead has score (should be ~70-80)
- [ ] Verify job title appears
- [ ] Verify source is "gated_content"

### Test 3.3: Lead Scoring - High Score
- [ ] Submit form with:
  - Email: ceo@bigcompany.com (corporate email)
  - Company: Big Company Inc
  - Job Title: CEO
  - Source: gated_content
- [ ] Check admin dashboard
- [ ] Verify score is 70-80+ (Hot lead)
- [ ] Verify appears in "Hot Leads" stat

### Test 3.4: Lead Scoring - Low Score
- [ ] Submit form with:
  - Email: user@gmail.com (free email)
  - Company: (empty)
  - Job Title: (empty)
  - Source: newsletter
- [ ] Check admin dashboard
- [ ] Verify score is 10-20 (Cold lead)
- [ ] Verify appears in "Cold Leads" stat

### Test 3.5: Score Filtering
- [ ] Go to /admin/leads
- [ ] Check Hot/Warm/Cold stats
- [ ] Filter by "Hot" (≥70)
- [ ] Verify only hot leads shown
- [ ] Filter by "Warm" (40-69)
- [ ] Verify only warm leads shown
- [ ] Filter by "Cold" (<40)
- [ ] Verify only cold leads shown

### Test 3.6: Export Leads
- [ ] Go to /admin/leads
- [ ] Apply filters (optional)
- [ ] Click "Export to CSV"
- [ ] Verify CSV downloads
- [ ] Open CSV
- [ ] Verify all lead data included

### Test 3.7: CRM Sync (if configured)
- [ ] Set environment variables:
  - CRM_PROVIDER=hubspot
  - HUBSPOT_API_KEY=your_test_key
- [ ] Submit gated content form
- [ ] Check server logs for "Syncing lead to hubspot"
- [ ] Check HubSpot/Salesforce
- [ ] Verify contact created with all fields

---

## PHASE 4: CONTENT WORKFLOW SYSTEM

### Test 4.1: Draft Content (Not Public)
- [ ] Go to /admin/insights
- [ ] Create new insight
- [ ] Set status: Draft
- [ ] Save
- [ ] Try to access /insights/[slug]
- [ ] Verify: 404 Not Found (draft not public)

### Test 4.2: Publish Now
- [ ] Edit draft insight
- [ ] Change status to "Published"
- [ ] Save
- [ ] Visit /insights/[slug]
- [ ] Verify: Content is visible
- [ ] Check publishedAt timestamp in database

### Test 4.3: Schedule Publishing
- [ ] Create new insight
- [ ] Set status: Scheduled
- [ ] Set scheduledAt: 5 minutes from now
- [ ] Save
- [ ] Try to access /insights/[slug]
- [ ] Verify: 404 (not published yet)
- [ ] Wait 5 minutes
- [ ] Run: POST /api/scheduler with auth header
- [ ] Visit /insights/[slug]
- [ ] Verify: Content is now visible

### Test 4.4: Status Badges
- [ ] Go to /admin/insights
- [ ] Create insights with different statuses
- [ ] Verify badges:
  - Draft: Gray
  - Review: Yellow
  - Scheduled: Blue
  - Published: Green
  - Archived: Red

### Test 4.5: Scheduler API
```bash
curl -X POST http://localhost:3000/api/scheduler \
  -H "Authorization: Bearer dev-secret"
```
- [ ] Verify response shows published count
- [ ] Check database for status changes
- [ ] Verify scheduled content is now published

### Test 4.6: Review Workflow
- [ ] Create insight with status=draft
- [ ] Change status to "review"
- [ ] Save
- [ ] Verify status badge shows yellow
- [ ] Change status to "published"
- [ ] Verify content appears on site

### Test 4.7: Archive Content
- [ ] Edit published insight
- [ ] Change status to "archived"
- [ ] Save
- [ ] Try to access /insights/[slug]
- [ ] Verify: 404 (archived not public)
- [ ] Verify still appears in admin with red badge

---

## INTEGRATION TESTS

### Test INT-1: Full User Journey
- [ ] User searches for "digital transformation"
- [ ] Clicks on insight result
- [ ] Reads insight
- [ ] Sees related industries/services
- [ ] Clicks related industry
- [ ] Sees related experts
- [ ] Clicks expert profile
- [ ] Sees expert's insights
- [ ] Clicks gated insight
- [ ] Fills lead form
- [ ] Downloads content
- [ ] Lead appears in admin with score

### Test INT-2: Admin Content Creation Flow
- [ ] Admin creates industry
- [ ] Admin creates service linked to industry
- [ ] Admin creates expert linked to both
- [ ] Admin creates insight (draft)
- [ ] Links insight to industry/service
- [ ] Submits for review
- [ ] Schedules for tomorrow
- [ ] Verifies not public yet
- [ ] Manually publishes
- [ ] Verifies appears on site
- [ ] Verifies in search results
- [ ] Verifies related content shows

### Test INT-3: Lead Capture to CRM Flow
- [ ] User downloads gated content
- [ ] Lead captured with score
- [ ] Email sent to sales team
- [ ] Lead synced to CRM
- [ ] Admin views lead in dashboard
- [ ] Admin filters by score
- [ ] Admin exports to CSV
- [ ] Admin emails lead directly

---

## PERFORMANCE TESTS

### Test PERF-1: Search Performance
- [ ] Search with 100+ results
- [ ] Verify loads in < 2 seconds
- [ ] Apply multiple filters
- [ ] Verify updates in < 500ms

### Test PERF-2: Page Load Times
- [ ] Homepage: < 2 seconds
- [ ] Industry page: < 2 seconds
- [ ] Service page: < 2 seconds
- [ ] Insight page: < 2 seconds
- [ ] Search page: < 2 seconds

### Test PERF-3: Admin Dashboard
- [ ] Load /admin/leads with 500+ leads
- [ ] Verify loads in < 3 seconds
- [ ] Filter and search
- [ ] Verify responsive

---

## SECURITY TESTS

### Test SEC-1: Draft Content Protection
- [ ] Try to access draft insight URL directly
- [ ] Verify: 404 or redirect
- [ ] Try to access via API
- [ ] Verify: Not returned

### Test SEC-2: Admin Access
- [ ] Try to access /admin without login
- [ ] Verify: Redirect to login or 401
- [ ] Login with valid credentials
- [ ] Verify: Access granted

### Test SEC-3: Scheduler API Security
- [ ] POST /api/scheduler without auth header
- [ ] Verify: 401 Unauthorized
- [ ] POST with wrong secret
- [ ] Verify: 401 Unauthorized
- [ ] POST with correct secret
- [ ] Verify: Success

### Test SEC-4: SQL Injection Prevention
- [ ] Try search with: `'; DROP TABLE insights; --`
- [ ] Verify: No error, safe handling
- [ ] Try in all input fields
- [ ] Verify: Prisma prevents injection

---

## BROWSER COMPATIBILITY

### Test BROWSER-1: Chrome
- [ ] All features work
- [ ] No console errors
- [ ] Responsive design works

### Test BROWSER-2: Firefox
- [ ] All features work
- [ ] No console errors
- [ ] Responsive design works

### Test BROWSER-3: Safari
- [ ] All features work
- [ ] No console errors
- [ ] Responsive design works

### Test BROWSER-4: Mobile (Chrome/Safari)
- [ ] Navigation works
- [ ] Search works
- [ ] Forms work
- [ ] Responsive layout correct

---

## ACCESSIBILITY TESTS

### Test A11Y-1: Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Verify focus indicators visible
- [ ] Verify logical tab order

### Test A11Y-2: Screen Reader
- [ ] Test with NVDA/JAWS/VoiceOver
- [ ] Verify all content readable
- [ ] Verify form labels announced
- [ ] Verify buttons have labels

### Test A11Y-3: Color Contrast
- [ ] Run Lighthouse accessibility audit
- [ ] Verify score > 90
- [ ] Fix any contrast issues

---

## SUMMARY

Total Tests: 50+
Estimated Testing Time: 4-6 hours

Mark each test as complete when verified.
Document any issues found.
