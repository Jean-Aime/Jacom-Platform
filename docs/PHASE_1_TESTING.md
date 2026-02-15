# Phase 1 Manual Testing Guide

## Prerequisites
- ✅ XAMPP Apache running
- ✅ MySQL database `jas_consulting` exists
- ✅ Backend accessible at `http://localhost/Jacom-Platform/backend`

---

## Test 1: Health Check

### Command
```bash
curl http://localhost/Jacom-Platform/backend
```

### Expected Response
```json
{
  "message": "API is running",
  "version": "1.0"
}
```

### Status
- [ ] Pass
- [ ] Fail (note error):

---

## Test 2: Industries - List All (Public)

### Command
```bash
curl http://localhost/Jacom-Platform/backend/industries
```

### Expected Response
```json
[
  {
    "id": "...",
    "name": "...",
    "slug": "...",
    "description": "...",
    "overview": "...",
    "challenges": "...",
    "trends": "...",
    "featured": true/false,
    "image": "...",
    "createdAt": "...",
    "updatedAt": "...",
    "services": [...],
    "experts": [...],
    "insights": [...]
  }
]
```

### Validation
- [ ] Returns array
- [ ] Includes `services`, `experts`, `insights` relations
- [ ] `featured` is boolean (not 0/1)
- [ ] Status code 200

---

## Test 3: Services - List All (Public)

### Command
```bash
curl http://localhost/Jacom-Platform/backend/services
```

### Expected Response
```json
[
  {
    "id": "...",
    "name": "...",
    "slug": "...",
    "description": "...",
    ...
  }
]
```

### Validation
- [ ] Returns array
- [ ] Status code 200

---

## Test 4: Leads - Create (Public)

### Command
```bash
curl -X POST http://localhost/Jacom-Platform/backend/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Company",
    "phone": "+1234567890",
    "message": "This is a test lead",
    "source": "website"
  }'
```

### Expected Response
```json
{
  "success": true,
  "id": "c..."
}
```

### Validation
- [ ] Returns success: true
- [ ] Returns generated ID
- [ ] Status code 200
- [ ] Lead appears in database

---

## Test 5: Careers - List All (Public)

### Command
```bash
curl http://localhost/Jacom-Platform/backend/careers
```

### Expected Response
```json
[
  {
    "id": "...",
    "title": "...",
    "slug": "...",
    "department": "...",
    "location": "...",
    "type": "...",
    "featured": 0/1,
    ...
  }
]
```

### Validation
- [ ] Returns array (may be empty)
- [ ] Status code 200
- [ ] No 500 error (controller exists)

---

## Test 6: Auth - Login

### Command
```bash
curl -X POST http://localhost/Jacom-Platform/backend/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "your_admin_password"
  }' \
  -c cookies.txt \
  -v
```

### Expected Response
```json
{
  "success": true,
  "user": {
    "id": "...",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

### Validation
- [ ] Returns success: true
- [ ] Returns user object
- [ ] Sets session cookie (check cookies.txt)
- [ ] Status code 200

---

## Test 7: Leads - List All (Authenticated)

### Command
```bash
curl http://localhost/Jacom-Platform/backend/leads \
  -b cookies.txt
```

### Expected Response
```json
[
  {
    "id": "...",
    "name": "...",
    "email": "...",
    "company": "...",
    "phone": "...",
    "message": "...",
    "source": "...",
    "createdAt": "...",
    ...
  }
]
```

### Validation
- [ ] Returns array (including test lead from Test 4)
- [ ] Status code 200
- [ ] Requires authentication (fails without cookies)

---

## Test 8: Leads - Get By ID (Authenticated)

### Command
```bash
# Replace {LEAD_ID} with ID from Test 4
curl http://localhost/Jacom-Platform/backend/leads/{LEAD_ID} \
  -b cookies.txt
```

### Expected Response
```json
{
  "id": "{LEAD_ID}",
  "name": "Test User",
  "email": "test@example.com",
  ...
}
```

### Validation
- [ ] Returns single lead object
- [ ] Status code 200
- [ ] Matches data from Test 4

---

## Test 9: Leads - Update (Authenticated)

### Command
```bash
# Replace {LEAD_ID} with ID from Test 4
curl -X PUT http://localhost/Jacom-Platform/backend/leads/{LEAD_ID} \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "name": "Updated Test User",
    "email": "test@example.com",
    "company": "Updated Company",
    "phone": "+1234567890",
    "message": "Updated message",
    "source": "website"
  }'
```

### Expected Response
```json
{
  "success": true
}
```

### Validation
- [ ] Returns success: true
- [ ] Status code 200
- [ ] Lead updated in database

---

## Test 10: Leads - Delete (Authenticated)

### Command
```bash
# Replace {LEAD_ID} with ID from Test 4
curl -X DELETE http://localhost/Jacom-Platform/backend/leads/{LEAD_ID} \
  -b cookies.txt
```

### Expected Response
```json
{
  "success": true
}
```

### Validation
- [ ] Returns success: true
- [ ] Status code 200
- [ ] Lead deleted from database

---

## Test 11: Industries - Create (Authenticated)

### Command
```bash
curl -X POST http://localhost/Jacom-Platform/backend/industries \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "name": "Test Industry",
    "slug": "test-industry",
    "description": "Test description",
    "overview": "Test overview",
    "challenges": "Test challenges",
    "trends": "Test trends",
    "featured": false,
    "image": null,
    "serviceIds": [],
    "expertIds": [],
    "insightIds": []
  }'
```

### Expected Response
```json
{
  "success": true,
  "id": "c..."
}
```

### Validation
- [ ] Returns success: true
- [ ] Returns generated ID
- [ ] Status code 201 (not 200)
- [ ] Industry appears in database

---

## Test 12: Error Handling - Invalid Email

### Command
```bash
curl -X POST http://localhost/Jacom-Platform/backend/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "invalid-email",
    "message": "Test"
  }'
```

### Expected Response
```json
{
  "error": "Invalid email"
}
```

### Validation
- [ ] Returns error message
- [ ] Status code 400
- [ ] Does not create lead

---

## Test 13: Error Handling - Unauthorized

### Command
```bash
curl http://localhost/Jacom-Platform/backend/leads
```

### Expected Response
```json
{
  "error": "Unauthorized"
}
```

### Validation
- [ ] Returns error message
- [ ] Status code 401 or 403
- [ ] Does not return data

---

## Test 14: Error Handling - Not Found

### Command
```bash
curl http://localhost/Jacom-Platform/backend/industries/nonexistent-slug
```

### Expected Response
```json
{
  "error": "Not found"
}
```

### Validation
- [ ] Returns error message
- [ ] Status code 404

---

## Summary

### Test Results
- Total Tests: 14
- Passed: ___
- Failed: ___
- Blocked: ___

### Critical Issues Found
1. 
2. 
3. 

### Non-Critical Issues Found
1. 
2. 
3. 

### Recommendations
- [ ] All tests pass → Proceed to Phase 2
- [ ] Minor issues → Fix and retest
- [ ] Major issues → Revisit Phase 1 implementation

---

## Notes

### Environment Details
- PHP Version: ___
- MySQL Version: ___
- XAMPP Version: ___
- OS: Windows

### Additional Observations


---

**Tested By:** _______________
**Date:** _______________
**Sign-off:** [ ] Approved for Phase 2
