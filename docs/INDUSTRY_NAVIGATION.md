# Industry Navigation Setup

## Overview
The homepage IndustrySelector component now has full navigation functionality:
- **Dropdown**: Select an industry from the dropdown to navigate to its page
- **Tag Buttons**: Click any industry tag to navigate directly
- **See All Link**: Navigate to the full industries listing page

## Database Setup

To ensure all industries are available in the database, run:

```bash
npx tsx prisma/seed-industries.ts
```

This will create/update the following industries:
- Retail
- Private Equity
- Advanced Manufacturing & Services
- Technology
- Oil & Gas
- Healthcare & Life Sciences
- Chemicals
- Consumer Products
- Mining
- Financial Services

## Navigation Flow

### Homepage → Industry Pages
1. User selects industry from dropdown → Navigates to `/industries/{slug}`
2. User clicks industry tag → Navigates to `/industries/{slug}`
3. User clicks "See all" → Navigates to `/industries`

### Homepage → Other Pages
- "LET'S GET STARTED" button → `/contact`
- "COME WORK HERE" button → `/careers`
- "SEE ALL INSIGHTS" button → `/insights`

## Files Modified
- `/components/IndustrySelector/IndustrySelector.tsx` - Added dropdown functionality with navigation
- `/prisma/seed-industries.ts` - Updated with all homepage industries

All pages already exist and are functional.
