# JACOM Academy - Seed Data Documentation

## 📋 Overview

This seed data file (`seed_academy_data.sql`) creates a complete, production-ready academy ecosystem with realistic data for testing and demonstration purposes.

## 🎯 What's Included

### 1. **Academy Settings**
- Hero title and subtitle
- Class start date: March 14, 2026
- Scholarship announcement: March 15, 2026
- Registration status: Open
- Contact phone: 202-386-2702

### 2. **Courses (5 Total)**

| Course | Category | Price | Students | Status |
|--------|----------|-------|----------|--------|
| AI-Powered Application Development | Application Development | $1,600 | 15 | Featured |
| Cloud Computing & DevOps Mastery | Cloud Computing | $1,200 | 8 | Published |
| Data Analytics & Business Intelligence | Data Analytics | $1,400 | 5 | Published |
| Advanced Database Architecture | Database | $1,100 | 3 | Published |
| Cybersecurity Fundamentals | Development | $1,500 | 2 | Published |

### 3. **Course Structure**
- **28 Course Materials** (videos, documents, assignments, quizzes)
- **7 Course Phases** across multiple courses
- **8 Pricing Plans** (location-based: Inside/Outside Rwanda)
- **7 Class Schedules** (live classes + 4 group sessions)

### 4. **Students (20 Total)**

All students have the same password for testing: `Student123!`

| ID | Name | Email | Enrollments |
|----|------|-------|-------------|
| student_001 | Sarah Johnson | sarah.johnson@email.com | 2 courses |
| student_002 | Michael Chen | michael.chen@email.com | 2 courses |
| student_003 | Amina Hassan | amina.hassan@email.com | 2 courses |
| student_004 | David Martinez | david.martinez@email.com | 2 courses |
| student_005 | Priya Patel | priya.patel@email.com | 2 courses |
| student_006 | James Okonkwo | james.okonkwo@email.com | 2 courses |
| student_007 | Emily Nguyen | emily.nguyen@email.com | 2 courses |
| student_008 | Omar Ali | omar.ali@email.com | 2 courses |
| student_009 | Sophia Kim | sophia.kim@email.com | 2 courses |
| student_010 | Lucas Silva | lucas.silva@email.com | 2 courses |
| student_011 | Fatima Rahman | fatima.rahman@email.com | 2 courses |
| student_012 | Alex Thompson | alex.thompson@email.com | 2 courses |
| student_013 | Yuki Tanaka | yuki.tanaka@email.com | 2 courses |
| student_014 | Maria Garcia | maria.garcia@email.com | 2 courses |
| student_015 | Kwame Mensah | kwame.mensah@email.com | 2 courses |
| student_016 | Isabella Rossi | isabella.rossi@email.com | 1 course |
| student_017 | Raj Kumar | raj.kumar@email.com | 1 course |
| student_018 | Nina Petrov | nina.petrov@email.com | 1 course |
| student_019 | Carlos Rodriguez | carlos.rodriguez@email.com | 0 courses |
| student_020 | Aisha Mohamed | aisha.mohamed@email.com | 0 courses |

### 5. **Enrollments (33 Total)**

**Status Breakdown:**
- ✅ **33 Approved** enrollments
- 💰 **Payment Status:**
  - Completed: 22 students
  - Partial: 8 students
  - Pending: 3 students

**Total Revenue:** $37,750

### 6. **Student Progress (35 Records)**

Sample progress tracking for 3 students:
- **Sarah Johnson** (student_001): Phase 2 in progress (10 materials completed)
- **Michael Chen** (student_002): Phase 1 completed, Phase 2 started
- **Priya Patel** (student_005): Advanced learner - Phase 3 in progress (14 materials completed)

## 🚀 How to Import

### Method 1: MySQL Command Line

```bash
# Navigate to the migrations folder
cd c:\xampp\htdocs\Jacom-Platform\backend\migrations

# Import the seed data
mysql -u root -p jacom_platform < seed_academy_data.sql
```

### Method 2: phpMyAdmin

1. Open phpMyAdmin (http://localhost/phpmyadmin)
2. Select the `jacom_platform` database
3. Click on the **Import** tab
4. Choose file: `seed_academy_data.sql`
5. Click **Go**

### Method 3: XAMPP MySQL Console

1. Open XAMPP Control Panel
2. Click **Shell** button
3. Run:
```bash
mysql -u root jacom_platform < "c:\xampp\htdocs\Jacom-Platform\backend\migrations\seed_academy_data.sql"
```

## ⚠️ Important Notes

### Before Importing

1. **Backup your database** if you have existing data
2. The file includes optional DELETE statements (commented out by default)
3. To clean existing data before import, uncomment lines 14-23

### After Importing

**Verify the import was successful:**

```sql
-- Check total records
SELECT 
    (SELECT COUNT(*) FROM courses) as total_courses,
    (SELECT COUNT(*) FROM user WHERE role = 'student') as total_students,
    (SELECT COUNT(*) FROM enrollments) as total_enrollments,
    (SELECT SUM(amountPaid) FROM enrollments) as total_revenue;
```

**Expected Results:**
- Courses: 5
- Students: 20
- Enrollments: 33
- Revenue: $37,750

## 🔐 Test Login Credentials

### Student Accounts
- **Email:** Any student email from the table above
- **Password:** `Student123!`

**Example:**
```
Email: sarah.johnson@email.com
Password: Student123!
```

### Admin Access
Use your existing admin account to:
- View all courses at `/admin/academy/courses`
- Manage enrollments at `/admin/academy/enrollments`
- View analytics at `/admin/academy`

## 📊 Data Relationships

```
academy_settings (1)
    └── courses (5)
        ├── course_phases (7)
        ├── course_pricing (8)
        ├── class_schedules (7)
        ├── course_materials (28)
        └── enrollments (33)
            └── student_progress (35)

user (20 students)
    └── enrollments (33)
        └── student_progress (35)
```

## 🎓 Use Cases

### 1. **Admin Testing**
- Create new courses
- Approve/reject enrollments
- View analytics dashboard
- Manage course materials

### 2. **Student Testing**
- Login as different students
- View enrolled courses
- Track learning progress
- Access course materials

### 3. **Payment Testing**
- Students with completed payments
- Students with partial payments
- Students with pending payments

### 4. **Progress Tracking**
- Active learners (in-progress materials)
- Completed phases
- Not-started materials

## 🔧 Customization

### Change Student Passwords

To set individual passwords, update the password hash in the INSERT statement:

```sql
-- Generate new password hash (use your backend auth system)
-- Then update the user record
UPDATE user 
SET password = 'new_hash_here' 
WHERE id = 'student_001';
```

### Add More Students

Follow the pattern in the seed file:

```sql
INSERT INTO user VALUES
('student_021', 'new.student@email.com', 'password_hash', 'New Student', 'student', 0, NULL, NOW(), NOW());
```

### Modify Course Prices

```sql
UPDATE courses 
SET fullPaymentPrice = 2000.00 
WHERE id = 'course_001';
```

## 📈 Analytics Preview

After importing, your admin dashboard will show:

- **Total Courses:** 5
- **Total Enrollments:** 33
- **Approved Students:** 33
- **Total Revenue:** $37,750
- **Recent Enrollments:** Last 10 registrations
- **Course Popularity:** AI Development (15), Cloud Computing (8), Data Analytics (5)

## 🐛 Troubleshooting

### Foreign Key Errors
Ensure the database schema is created first:
```bash
mysql -u root jacom_platform < create_academy_tables.sql
```

### Duplicate Entry Errors
The seed data uses fixed IDs. If you've already imported once, either:
1. Uncomment the DELETE statements (lines 14-23)
2. Drop and recreate the tables
3. Use different IDs in the seed file

### Password Not Working
The password hash is a sample. For production:
1. Use the signup endpoint to create real users
2. Or generate proper Argon2ID hashes using your backend

## 📝 Notes

- All timestamps use `NOW()` for current date/time
- Student passwords are hashed with Argon2ID (sample hash provided)
- Course materials have placeholder URLs (update for production)
- Enrollment dates span from Feb 15 to Mar 11, 2026
- Payment amounts are realistic based on course pricing

## 🎉 Success!

Once imported, you can:
1. Visit `/academy` to see the public academy page
2. Login as a student at `/login`
3. Access student dashboard at `/academy/dashboard`
4. Manage everything at `/admin/academy`

---

**Created by:** JACOM Development Team  
**Last Updated:** March 2026  
**Version:** 1.0.0
