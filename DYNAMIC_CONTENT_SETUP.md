# Dynamic Content System - Setup Instructions

## What Was Done

All static pages are now dynamic and editable from admin panel:
- ✅ Home Page (Hero section)
- ✅ About Page (All content)
- ✅ Contact Page (All text & offices)
- ✅ Digital Page (All sections)
- ✅ Footer (Global content)

## Setup Steps

### 1. Run Database Migration
```bash
npx prisma migrate dev --name add_content_blocks
```

### 2. Seed Content Blocks
```bash
npm run db:seed-content
```

### 3. Restart Dev Server
```bash
npm run dev
```

## Admin Access

Navigate to: http://localhost:3000/admin/content

Here you can:
- View all content blocks grouped by page/section
- Edit any text, JSON data, or HTML content
- Add new content blocks
- Delete unused blocks
- Reorder content with the order field

## Content Block Structure

Each block has:
- **key**: Unique identifier (e.g., `home_hero_title`)
- **page**: Page name (home, about, contact, digital, global)
- **section**: Section name (hero, content, cta, footer)
- **type**: text, json, or html
- **content**: The actual content
- **order**: Display order within section

## Example: Editing Home Hero

1. Go to /admin/content
2. Find "Home Page" → "Hero Section"
3. Click "Edit" on `home_hero_title`
4. Change content to your new title
5. Click "Update"
6. Refresh homepage to see changes

## Adding New Content

1. Click "New Content Block"
2. Fill in:
   - Key: `page_section_name` (e.g., `home_cta_button`)
   - Page: Select from dropdown
   - Section: Enter section name
   - Type: text/json/html
   - Content: Your content
   - Order: Display order
3. Update your component to use this content

## JSON Content Example

For arrays/objects, use type "json":
```json
["Item 1", "Item 2", "Item 3"]
```

Or:
```json
[{"title": "Feature 1", "desc": "Description"}]
```

## Notes

- Changes are instant (no rebuild needed)
- Content is cached per page
- All existing static content is preserved in database
- Backward compatible (defaults to original text if DB empty)
