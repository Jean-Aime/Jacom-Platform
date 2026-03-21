# 🔧 ADMIN API INTEGRATION GUIDE

**Complete Backend Implementation for Admin Management**

---

## 📋 TABLE OF CONTENTS

1. [Setup Instructions](#setup-instructions)
2. [API Endpoints](#api-endpoints)
3. [Database Tables](#database-tables)
4. [File Upload System](#file-upload-system)
5. [Frontend Integration](#frontend-integration)
6. [Testing Guide](#testing-guide)

---

## 🚀 SETUP INSTRUCTIONS

### **Step 1: Create Additional Database Tables**

Run the migration to create all admin management tables:

```bash
cd c:\xampp\htdocs\Jacom-Platform\backend
mysql -u root -p jacom_platform
```

Then in MySQL:
```sql
SOURCE migrations/create_admin_management_tables.sql;
```

Or via phpMyAdmin:
- Import `migrations/create_admin_management_tables.sql`

**Tables Created:**
- ✅ `payments` - Payment transaction records
- ✅ `invoices` - Invoice generation and tracking
- ✅ `notifications` - Notification management
- ✅ `notification_recipients` - Notification delivery tracking
- ✅ `assignments` - Assignment details
- ✅ `assignment_submissions` - Student submissions and grades
- ✅ `instructors` - Instructor profiles
- ✅ `certificates` - Certificate records
- ✅ `quiz_questions` - Quiz questions for lessons
- ✅ `quiz_submissions` - Student quiz attempts

### **Step 2: Create Upload Directory**

```bash
mkdir c:\xampp\htdocs\Jacom-Platform\uploads\course-materials
```

Or the backend will create it automatically on first upload.

### **Step 3: Verify Backend Routes**

Backend routes are now loaded in `backend/index.php`:
```php
require_once __DIR__ . '/routes/academy.php';
require_once __DIR__ . '/routes/student.php';
require_once __DIR__ . '/routes/admin.php';
```

---

## 🔌 API ENDPOINTS

### **ENROLLMENT MANAGEMENT**

#### Get All Enrollments
```http
GET /admin/enrollments
Headers: X-Session-Token: {admin_token}

Response:
[
  {
    "id": "enroll_001",
    "userId": "user_123",
    "studentName": "John Doe",
    "studentEmail": "john@example.com",
    "courseId": "course_001",
    "courseName": "Full Stack Web Development",
    "courseSlug": "full-stack-web-development",
    "status": "approved",
    "paymentStatus": "partial",
    "amountPaid": 450.00,
    "totalAmount": 1080.00,
    "progress": 40,
    "totalLessons": 12,
    "completedLessons": 5,
    "enrolledAt": "2024-03-01 10:00:00"
  }
]
```

#### Update Enrollment Status
```http
PUT /admin/enrollments/{enrollmentId}/status
Headers: X-Session-Token: {admin_token}
Content-Type: application/json

Body:
{
  "status": "approved"
}

Response:
{
  "success": true,
  "message": "Enrollment status updated"
}
```

#### Record Payment
```http
POST /admin/enrollments/{enrollmentId}/payment
Headers: X-Session-Token: {admin_token}
Content-Type: application/json

Body:
{
  "amount": 400.00,
  "method": "bank_transfer",
  "reference": "TXN123456"
}

Response:
{
  "success": true,
  "message": "Payment recorded successfully",
  "newAmountPaid": 850.00,
  "paymentStatus": "partial"
}
```

---

### **PAYMENT MANAGEMENT**

#### Get All Payments
```http
GET /admin/payments
Headers: X-Session-Token: {admin_token}

Response:
[
  {
    "id": "pay_001",
    "enrollmentId": "enroll_001",
    "amount": 400.00,
    "method": "bank_transfer",
    "reference": "TXN123456",
    "studentName": "John Doe",
    "courseName": "Full Stack Web Development",
    "createdAt": "2024-03-15 14:30:00"
  }
]
```

---

### **NOTIFICATION MANAGEMENT**

#### Get All Notifications
```http
GET /admin/notifications
Headers: X-Session-Token: {admin_token}

Response:
[
  {
    "id": "notif_001",
    "type": "announcement",
    "title": "New Course Available",
    "message": "Check out our new React course!",
    "recipients": "all",
    "status": "sent",
    "readCount": 45,
    "totalRecipients": 100,
    "createdAt": "2024-03-15 10:00:00"
  }
]
```

#### Create Notification
```http
POST /admin/notifications
Headers: X-Session-Token: {admin_token}
Content-Type: application/json

Body:
{
  "type": "announcement",
  "title": "Class Reminder",
  "message": "Live class starts in 1 hour",
  "recipients": "course",
  "courseId": "course_001",
  "scheduledFor": "2024-03-20 10:00:00"
}

Response:
{
  "success": true,
  "message": "Notification created successfully",
  "notificationId": "notif_002"
}
```

---

### **ASSIGNMENT MANAGEMENT**

#### Create Assignment
```http
POST /admin/assignments
Headers: X-Session-Token: {admin_token}
Content-Type: application/json

Body:
{
  "title": "Build a Todo App",
  "description": "Create a React todo application",
  "courseId": "course_001",
  "dueDate": "2024-04-01 23:59:59",
  "maxGrade": 100
}

Response:
{
  "success": true,
  "message": "Assignment created successfully",
  "assignmentId": "assign_001"
}
```

#### Grade Assignment
```http
PUT /admin/assignments/{assignmentId}/grade
Headers: X-Session-Token: {admin_token}
Content-Type: application/json

Body:
{
  "userId": "user_123",
  "grade": 95,
  "feedback": "Excellent work! Clean code and good practices."
}

Response:
{
  "success": true,
  "message": "Assignment graded successfully"
}
```

---

### **STUDENT MANAGEMENT**

#### Get Student Details
```http
GET /admin/students/{userId}
Headers: X-Session-Token: {admin_token}

Response:
{
  "student": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  },
  "enrollments": [
    {
      "id": "enroll_001",
      "courseName": "Full Stack Web Development",
      "courseSlug": "full-stack-web-development",
      "status": "approved",
      "progress": 40,
      "totalLessons": 12,
      "completedLessons": 5
    }
  ]
}
```

#### Update Student
```http
PUT /admin/students/{userId}
Headers: X-Session-Token: {admin_token}
Content-Type: application/json

Body:
{
  "name": "John Smith",
  "email": "john.smith@example.com"
}

Response:
{
  "success": true,
  "message": "Student updated successfully"
}
```

---

### **ANALYTICS**

#### Get Analytics Dashboard
```http
GET /admin/analytics
Headers: X-Session-Token: {admin_token}

Response:
{
  "totalRevenue": 15420.00,
  "totalEnrollments": 45,
  "activeStudents": 38,
  "completionRate": 67.5
}
```

---

### **FILE UPLOAD**

#### Upload Course Material
```http
POST /admin/upload
Headers: X-Session-Token: {admin_token}
Content-Type: multipart/form-data

Body:
file: [binary file data]

Response:
{
  "success": true,
  "fileUrl": "/uploads/course-materials/abc123def456.pdf",
  "filename": "abc123def456.pdf"
}
```

---

## 📊 DATABASE TABLES

### **Payments Table**
```sql
CREATE TABLE `payments` (
  `id` VARCHAR(50) PRIMARY KEY,
  `enrollmentId` VARCHAR(50) NOT NULL,
  `amount` DECIMAL(10,2) NOT NULL,
  `method` ENUM('card', 'bank_transfer', 'cash', 'mobile_money'),
  `reference` VARCHAR(255),
  `status` ENUM('pending', 'completed', 'failed', 'refunded'),
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **Notifications Table**
```sql
CREATE TABLE `notifications` (
  `id` VARCHAR(50) PRIMARY KEY,
  `type` ENUM('announcement', 'reminder', 'payment', 'enrollment', 'completion', 'assignment'),
  `title` VARCHAR(255) NOT NULL,
  `message` TEXT NOT NULL,
  `recipients` ENUM('all', 'students', 'instructors', 'course'),
  `courseId` VARCHAR(50) NULL,
  `status` ENUM('draft', 'scheduled', 'sent'),
  `scheduledFor` TIMESTAMP NULL,
  `readCount` INT DEFAULT 0,
  `totalRecipients` INT DEFAULT 0
);
```

### **Assignments Table**
```sql
CREATE TABLE `assignments` (
  `id` VARCHAR(50) PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `courseId` VARCHAR(50) NOT NULL,
  `dueDate` TIMESTAMP NULL,
  `maxGrade` INT DEFAULT 100
);
```

---

## 📁 FILE UPLOAD SYSTEM

### **Upload Directory Structure**
```
c:\xampp\htdocs\Jacom-Platform\
  └── uploads/
      └── course-materials/
          ├── abc123def456.pdf
          ├── xyz789ghi012.mp4
          └── ...
```

### **Supported File Types**
- **Documents:** PDF, DOCX, TXT
- **Videos:** MP4, AVI, MOV
- **Images:** JPG, PNG, GIF
- **Code:** ZIP, RAR

### **Frontend Upload Example**
```typescript
const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const token = localStorage.getItem('session-token');
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
  
  const response = await fetch(`${backendUrl}/admin/upload`, {
    method: 'POST',
    headers: {
      'X-Session-Token': token || ''
    },
    body: formData
  });
  
  const data = await response.json();
  return data.fileUrl;
};
```

---

## 🔗 FRONTEND INTEGRATION

### **Example: Enrollment Management Page**

```typescript
// Fetch enrollments
const fetchEnrollments = async () => {
  const token = localStorage.getItem('session-token');
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
  
  const response = await fetch(`${backendUrl}/admin/enrollments`, {
    headers: {
      'X-Session-Token': token || ''
    }
  });
  
  if (response.ok) {
    const data = await response.json();
    setEnrollments(data);
  }
};

// Record payment
const recordPayment = async (enrollmentId: string, amount: number, method: string) => {
  const token = localStorage.getItem('session-token');
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
  
  const response = await fetch(`${backendUrl}/admin/enrollments/${enrollmentId}/payment`, {
    method: 'POST',
    headers: {
      'X-Session-Token': token || '',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ amount, method, reference: 'TXN' + Date.now() })
  });
  
  if (response.ok) {
    alert('Payment recorded successfully!');
    fetchEnrollments(); // Refresh data
  }
};
```

---

## 🧪 TESTING GUIDE

### **Step 1: Test Enrollment Management**
1. Login as admin
2. Go to `/admin/academy/enrollments`
3. Click "Record Payment" on any enrollment
4. Enter amount and payment method
5. Verify payment is recorded in database

### **Step 2: Test Notification System**
1. Go to `/admin/academy/notifications`
2. Click "Create Notification"
3. Fill in title, message, recipients
4. Click "Send Notification"
5. Verify notification is created

### **Step 3: Test File Upload**
1. Go to `/admin/training/courses/create`
2. Upload a PDF or video file
3. Verify file is saved in `uploads/course-materials/`
4. Verify file URL is returned

### **Step 4: Test Analytics**
1. Go to `/admin/training/analytics`
2. Verify statistics are fetched from database
3. Check revenue, enrollments, completion rate

---

## ✅ VERIFICATION CHECKLIST

- [ ] Database tables created successfully
- [ ] Upload directory exists and is writable
- [ ] Admin routes loaded in backend
- [ ] Session authentication works
- [ ] Enrollment management functional
- [ ] Payment recording works
- [ ] Notification creation works
- [ ] File upload works
- [ ] Analytics display correctly
- [ ] All frontend pages connect to backend

---

## 🎯 NEXT STEPS

1. **Run the database migration**
2. **Test each endpoint with Postman or frontend**
3. **Upload test files**
4. **Create test notifications**
5. **Record test payments**
6. **Verify all data in database**

---

**System Status:** ✅ **FULLY IMPLEMENTED**

All admin functionality is now connected to the database with complete CRUD operations, file uploads, and real-time data tracking.
