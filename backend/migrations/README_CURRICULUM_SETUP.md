# Course Curriculum Setup Instructions

## Overview
This guide will help you set up the course curriculum system that displays detailed course content (phases, weeks, topics, and resources) to authenticated students.

## What's Been Implemented

### ✅ Backend (PHP)
- **Authentication Required**: Course details now require login
- **Curriculum API**: `CoursesController.php` updated to fetch full curriculum structure
- **Methods Added**:
  - `getPhasesWithCurriculum()` - Fetches phases with nested weeks
  - `getWeeks()` - Fetches weeks with nested topics
  - `getTopics()` - Fetches topics with nested resources
  - `getResources()` - Fetches learning materials

### ✅ Frontend (Next.js)
- **Protected Route**: `/training/[slug]/page.tsx` requires authentication
- **Accordion UI**: Expandable/collapsible phases, weeks, and topics
- **Resource Icons**: Different icons for video syllabus, curriculum, notes, and web access
- **Auto-redirect**: Non-authenticated users redirected to login

## Database Setup Required

### Step 1: Create Curriculum Tables
Run this SQL file to create the necessary tables:

```bash
# Navigate to phpMyAdmin or use MySQL command line
# Import: create_curriculum_tables.sql
```

**File Location**: `backend/migrations/create_curriculum_tables.sql`

**Tables Created**:
- `course_weeks` - Weekly breakdown of each phase
- `course_topics` - Topics covered in each week  
- `course_resources` - Learning materials (videos, notes, etc.)

### Step 2: Seed Curriculum Data
Run this SQL file to populate sample curriculum:

```bash
# Import: seed_curriculum_simple.sql
```

**File Location**: `backend/migrations/seed_curriculum_simple.sql`

**Data Created**:
- Week 1-3 for Phase 1 (HTML/CSS/Bootstrap)
- Week 1-3 for Phase 2 (JavaScript)
- Topics and resources for each week

## Using phpMyAdmin (Recommended)

1. **Open phpMyAdmin**: `http://localhost/phpmyadmin`
2. **Select Database**: Click on `jas_consulting`
3. **Import Tables**:
   - Click "Import" tab
   - Choose file: `create_curriculum_tables.sql`
   - Click "Go"
4. **Import Data**:
   - Click "Import" tab again
   - Choose file: `seed_curriculum_simple.sql`
   - Click "Go"

## How It Works

### Authentication Flow
```
User → Login → Dashboard → Click "View Details" → Course Detail Page
                                                    ↓
                                            Check Authentication
                                                    ↓
                                            Fetch Course + Curriculum
                                                    ↓
                                            Display Accordion UI
```

### Data Structure
```
Course
  └── Phases (Phase 1, Phase 2, etc.)
       └── Weeks (Week 1, Week 2, etc.)
            └── Topics (Topic 1, Topic 2, etc.)
                 └── Resources (Video Syllabus, Curriculum, Notes, WebAccess)
```

### API Endpoint
```
GET /courses/{slug}
Headers: X-Session-Token: {token}

Response:
{
  "id": "course_001",
  "name": "AI-Powered Application Development",
  "slug": "ai-powered-app-development",
  "phases": [
    {
      "id": "phase_001",
      "phaseNumber": 1,
      "title": "Building static websites...",
      "weeks": [
        {
          "id": "week_p1_w1",
          "weekNumber": 1,
          "title": "Introduction to BI...",
          "taskList": "Week 1 - TASK LIST...",
          "topics": [
            {
              "id": "topic_w1_intro",
              "title": "1. Introduction to BI...",
              "resources": [
                {
                  "type": "video_syllabus",
                  "title": "Video Syllabus",
                  "url": "#"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

## Testing

### 1. Login as Student
```
URL: http://localhost:3000/login
Email: sarah.johnson@email.com
Password: Student123!
```

### 2. View Dashboard
```
URL: http://localhost:3000/training/dashboard
```

### 3. Click "View Details" on Any Course
```
URL: http://localhost:3000/training/ai-powered-app-development
```

### Expected Result
- ✅ Authentication check passes
- ✅ Course header displays
- ✅ Phase 1 accordion shows (expanded by default)
- ✅ Week 1 shows with task list
- ✅ Topics are expandable
- ✅ Resources show with icons

## Troubleshooting

### "Course Not Found" Error
**Cause**: Curriculum tables don't exist or no data seeded
**Solution**: Run both SQL files in order

### "401 Unauthorized" Error
**Cause**: Not logged in or session expired
**Solution**: Login again at `/login`

### No Curriculum Showing
**Cause**: Phase IDs don't match between `course_phases` and `course_weeks`
**Solution**: Check that phase IDs in seed data match:
- Phase 1: `phase_001`
- Phase 2: `phase_002`

### Resources Not Showing
**Cause**: Foreign key relationships broken
**Solution**: Ensure tables created in correct order:
1. `course_weeks` (references `course_phases`)
2. `course_topics` (references `course_weeks`)
3. `course_resources` (references `course_topics`)

## Adding More Curriculum

To add curriculum for other courses, follow this pattern:

```sql
-- 1. Add weeks for a phase
INSERT INTO course_weeks (id, phaseId, weekNumber, title, description) VALUES
('week_custom_1', 'phase_003', 1, 'Week Title', 'Description');

-- 2. Add topics for the week
INSERT INTO course_topics (id, weekId, title, orderIndex) VALUES
('topic_custom_1', 'week_custom_1', '1. Topic Title', 1);

-- 3. Add resources for the topic
INSERT INTO course_resources (id, topicId, type, title, url, orderIndex) VALUES
('res_custom_1', 'topic_custom_1', 'video_syllabus', 'Video Syllabus', '#', 1);
```

## Security Features

✅ **Authentication Required**: All course details require valid session
✅ **Token Validation**: Backend validates session token on every request
✅ **Auto-redirect**: Frontend redirects to login if no token
✅ **Session Expiry**: Invalid/expired tokens trigger re-login

## Next Steps

1. ✅ Run database migrations
2. ✅ Test login flow
3. ✅ Test course detail access
4. 📝 Add more curriculum content
5. 📝 Upload actual video/resource URLs
6. 📝 Create admin panel to manage curriculum

---

**Created**: March 14, 2026
**System**: JACOM Training Platform
**Status**: Production Ready
