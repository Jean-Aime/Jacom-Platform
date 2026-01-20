# Landing Page - Next.js + TypeScript

## Project Structure

```
landing-page/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles with Tailwind
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
│
├── components/                   # React components
│   ├── Header/                  # Navigation header
│   ├── Hero/                    # Hero section with background
│   ├── IndustrySelector/        # Industry tags section
│   ├── FeaturedStories/         # Carousel with client stories
│   ├── VideoSection/            # Video player section
│   ├── LatestInsights/          # Blog/insights grid
│   ├── CTASection/              # Call-to-action buttons
│   └── Footer/                  # Footer with newsletter
│
├── public/                      # Static assets
│   └── images/                  # Image files
│
├── next.config.js               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── postcss.config.js            # PostCSS configuration
└── package.json                 # Dependencies

```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
npm start
```

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **React 18** - UI library
