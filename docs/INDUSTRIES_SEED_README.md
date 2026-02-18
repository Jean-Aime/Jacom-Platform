# Industries Seeding Instructions

## Overview
This seed file populates your database with 7 comprehensive industries based on JACOM's business document:

1. **Consulting & Innovation** - Strategic consulting, digital transformation, ESG
2. **IT & Technology** - IoT, embedded systems, smart technology
3. **Education & Training** - Web development courses, professional training
4. **Recruitment & HR Services** - Nepal to Japan recruitment
5. **Financial Services** - Tax management, asset management, banking
6. **Business Development** - Legal services, governance, ESG
7. **Energy & Sustainability** - Renewable energy, VPP, EMS systems

## How to Run

### Step 1: Navigate to frontend directory
```bash
cd frontend
```

### Step 2: Run the seed script
```bash
npm run db:seed-industries
```

### Step 3: Verify in Admin Panel
1. Go to http://localhost:3000/admin/login
2. Login with: `admin@jas.com` / `admin123`
3. Navigate to "Industries Management"
4. You should see all 7 industries populated

## What Gets Created

Each industry includes:
- ✅ **Name** - Industry title
- ✅ **Slug** - URL-friendly identifier
- ✅ **Description** - Short summary
- ✅ **Overview** - Detailed description (2-3 paragraphs)
- ✅ **Challenges** - Key challenges and focus areas
- ✅ **Trends** - Current trends and market insights
- ✅ **Featured** - Flag for homepage display

## Navigation Dropdown

After seeding, the header navigation will automatically show:
- Industries dropdown with all 7 industries
- Each industry links to `/industries/[slug]`
- Featured industries appear first

## Industry Pages

Each industry will have a dedicated page at:
- `/industries/consulting-innovation`
- `/industries/it-technology`
- `/industries/education-training`
- `/industries/recruitment-hr`
- `/industries/financial-services`
- `/industries/business-development`
- `/industries/energy-sustainability`

## Customization

To edit any industry:
1. Go to Admin Panel → Industries Management
2. Click "Edit" on any industry
3. Modify content, add images, link services/experts
4. Changes reflect immediately on public pages

## Data Source

All content is extracted from your business documents:
- Company profile
- Service descriptions
- Partnership agreements
- Training programs
- Vision and mission statements
