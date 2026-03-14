# QUICK FIX - Course Not Found Error

## The Problem
You're getting "Course Not Found" because the backend API needs to be tested.

## Quick Diagnostic Steps

### Step 1: Test Backend API Directly
Open this URL in your browser:
```
http://localhost/Jacom-Platform/backend/test_course_api.php
```

This will show you:
- ✓ If courses exist in database
- ✓ If phases exist
- ✓ If weeks exist
- ✓ If the slug 'ai-powered-app-development' is found

### Step 2: Check phpMyAdmin

Go to phpMyAdmin and run these queries:

**Query 1: Check courses**
```sql
SELECT id, name, slug FROM courses WHERE slug = 'ai-powered-app-development';
```
Expected: Should return 1 row with course_001

**Query 2: Check phases**
```sql
SELECT id, phaseId FROM course_weeks LIMIT 5;
```
Expected: Should return rows like week_p1_w1, week_p1_w2, etc.

**Query 3: Verify seed data was imported**
```sql
SELECT COUNT(*) as total FROM course_weeks;
```
Expected: Should show 6 or more rows

### Step 3: Common Issues & Fixes

#### Issue 1: No curriculum data
**Symptom**: course_weeks table is empty
**Fix**: Re-import `seed_curriculum_simple.sql`

#### Issue 2: Wrong phase IDs
**Symptom**: Weeks exist but phaseId doesn't match
**Fix**: Run this query to check phase IDs:
```sql
SELECT id, courseId, phaseNumber FROM course_phases WHERE courseId = 'course_001';
```

Then update the seed data to use the correct phase IDs.

#### Issue 3: Backend not finding course
**Symptom**: API returns 404
**Fix**: Check the courses table has the correct slug:
```sql
UPDATE courses SET slug = 'ai-powered-app-development' WHERE id = 'course_001';
```

### Step 4: Manual Test of Full Flow

1. **Login**
   ```
   http://localhost:3000/login
   Email: sarah.johnson@email.com
   Password: Student123!
   ```

2. **Check Session Token**
   - Open browser DevTools (F12)
   - Go to Application → Local Storage
   - Verify 'session-token' exists

3. **Test API Directly**
   - Open DevTools → Network tab
   - Visit: `http://localhost:3000/training/ai-powered-app-development`
   - Check the API call to backend
   - Look for 401 (auth error) or 404 (not found)

## Most Likely Issue

The seed data wasn't imported correctly. Please:

1. Go to phpMyAdmin
2. Select `jas_consulting` database
3. Click on `course_weeks` table
4. Check if it has any rows
5. If empty, re-import `seed_curriculum_simple.sql`

## Alternative: Quick Manual Insert

If seed file keeps failing, run this directly in phpMyAdmin SQL tab:

```sql
-- Quick test insert
INSERT INTO course_weeks (id, phaseId, weekNumber, title, description) VALUES
('test_week_1', 'phase_001', 1, 'Test Week', 'Test Description');

INSERT INTO course_topics (id, weekId, title, orderIndex) VALUES
('test_topic_1', 'test_week_1', 'Test Topic', 1);

INSERT INTO course_resources (id, topicId, type, title, url, orderIndex) VALUES
('test_res_1', 'test_topic_1', 'video_syllabus', 'Test Video', '#', 1);
```

Then refresh the course page.

## Need More Help?

Run the test script and share the output:
```
http://localhost/Jacom-Platform/backend/test_course_api.php
```
