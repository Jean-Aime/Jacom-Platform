# Course Curriculum Management System

## Overview
Complete system for course curriculum management with sequential step-by-step learning progression.

## Database Schema

### 1. Course Modules Table
```sql
CREATE TABLE course_modules (
    id VARCHAR(50) PRIMARY KEY,
    course_id VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    order_index INT NOT NULL,
    duration VARCHAR(50),
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);
```

### 2. Module Lessons Table
```sql
CREATE TABLE module_lessons (
    id VARCHAR(50) PRIMARY KEY,
    module_id VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    order_index INT NOT NULL,
    content_type ENUM('video', 'reading', 'quiz', 'assignment', 'project') NOT NULL,
    content_url TEXT,
    content_text LONGTEXT,
    duration VARCHAR(50),
    is_required BOOLEAN DEFAULT true,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (module_id) REFERENCES course_modules(id) ON DELETE CASCADE
);
```

### 3. Lesson Steps Table
```sql
CREATE TABLE lesson_steps (
    id VARCHAR(50) PRIMARY KEY,
    lesson_id VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    order_index INT NOT NULL,
    step_type ENUM('watch', 'read', 'practice', 'quiz', 'submit') NOT NULL,
    content LONGTEXT,
    resources JSON,
    estimated_time VARCHAR(50),
    is_required BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (lesson_id) REFERENCES module_lessons(id) ON DELETE CASCADE
);
```

### 4. Student Progress Table
```sql
CREATE TABLE student_progress (
    id VARCHAR(50) PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL,
    enrollment_id VARCHAR(50) NOT NULL,
    course_id VARCHAR(50) NOT NULL,
    module_id VARCHAR(50),
    lesson_id VARCHAR(50),
    step_id VARCHAR(50),
    status ENUM('not_started', 'in_progress', 'completed', 'locked') DEFAULT 'locked',
    completion_percentage INT DEFAULT 0,
    started_at TIMESTAMP NULL,
    completed_at TIMESTAMP NULL,
    time_spent INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (enrollment_id) REFERENCES enrollments(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (module_id) REFERENCES course_modules(id) ON DELETE SET NULL,
    FOREIGN KEY (lesson_id) REFERENCES module_lessons(id) ON DELETE SET NULL,
    FOREIGN KEY (step_id) REFERENCES lesson_steps(id) ON DELETE SET NULL
);
```

### 5. Course Preview Content Table
```sql
CREATE TABLE course_preview_content (
    id VARCHAR(50) PRIMARY KEY,
    course_id VARCHAR(50) NOT NULL,
    section_title VARCHAR(255) NOT NULL,
    section_content TEXT,
    order_index INT NOT NULL,
    is_visible BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);
```

## Features

### For Students (Before Enrollment)
- View course overview and description
- See module titles and high-level topics
- View learning outcomes
- See course duration and structure
- **Cannot access**: Full curriculum, lesson content, videos, materials

### For Students (After Enrollment)
- Access full curriculum with all modules
- View all lessons and steps
- Sequential progression (must complete Step 1 before Step 2)
- Track progress with percentage completion
- Access videos, materials, and resources
- Submit assignments and quizzes
- Earn certificates upon completion

### For Admins
- Create and manage courses
- Add/edit/delete modules
- Add/edit/delete lessons
- Add/edit/delete steps
- Set content type (video, reading, quiz, etc.)
- Upload resources and materials
- Set order and prerequisites
- Publish/unpublish content
- View student progress
- Manage course preview content

## Sequential Progression Rules

1. **Module Level**: Must complete Module 1 before accessing Module 2
2. **Lesson Level**: Must complete all lessons in a module sequentially
3. **Step Level**: Must complete all steps in a lesson sequentially
4. **Validation**: Backend validates completion before unlocking next item
5. **Progress Tracking**: Real-time tracking of completion status

## API Endpoints

### Student Endpoints
- `GET /student/courses/:courseId/preview` - Get course preview (before enrollment)
- `GET /student/courses/:courseId/curriculum` - Get full curriculum (after enrollment)
- `GET /student/courses/:courseId/progress` - Get student progress
- `POST /student/lessons/:lessonId/steps/:stepId/complete` - Mark step as complete
- `GET /student/lessons/:lessonId/steps/:stepId/unlock` - Check if step is unlocked

### Admin Endpoints
- `GET /admin/courses/:courseId/modules` - Get all modules
- `POST /admin/courses/:courseId/modules` - Create module
- `PUT /admin/modules/:moduleId` - Update module
- `DELETE /admin/modules/:moduleId` - Delete module
- `POST /admin/modules/:moduleId/lessons` - Create lesson
- `PUT /admin/lessons/:lessonId` - Update lesson
- `DELETE /admin/lessons/:lessonId` - Delete lesson
- `POST /admin/lessons/:lessonId/steps` - Create step
- `PUT /admin/steps/:stepId` - Update step
- `DELETE /admin/steps/:stepId` - Delete step
- `GET /admin/courses/:courseId/students-progress` - View all student progress

## Implementation Priority

1. ✅ Database schema creation
2. Backend API for curriculum management
3. Admin interface for course management
4. Course preview page for non-enrolled students
5. Full curriculum viewer for enrolled students
6. Sequential progression system with validation
7. Progress tracking and analytics
