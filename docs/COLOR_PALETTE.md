# Color Palette

## Primary Colors

### Brand Primary (Red)
- **Color**: `#DC0032`
- **Usage**: Primary buttons, links, accents, CTAs, brand elements
- **Tailwind Class**: `bg-primary`, `text-primary`, `border-primary`

### Dark
- **Color**: `#1a1a1a`
- **Usage**: Dark backgrounds, text on light backgrounds
- **Tailwind Class**: `bg-dark`, `text-dark`

## Neutral Colors (Tailwind Defaults)

### Gray Scale
- **gray-50**: `#f9fafb` - Light backgrounds
- **gray-100**: `#f3f4f6` - Card backgrounds, subtle sections
- **gray-200**: `#e5e7eb` - Borders, dividers
- **gray-300**: `#d1d5db` - Input borders
- **gray-400**: `#9ca3af` - Disabled states
- **gray-500**: `#6b7280` - Secondary text
- **gray-600**: `#4b5563` - Body text
- **gray-700**: `#374151` - Headings
- **gray-800**: `#1f2937` - Dark text
- **gray-900**: `#111827` - Darkest text

### White & Black
- **white**: `#ffffff` - Backgrounds, text on dark
- **black**: `#000000` - Text, overlays

## Gradient Backgrounds

### Hero Gradients
```css
from-purple-900 via-red-900 to-black
from-primary/10 to-red-50
from-primary to-red-600
```

### Overlay Gradients
```css
from-black/60 to-transparent
from-primary/20 to-red-100
```

## Opacity Variations

### Primary with Opacity
- `bg-primary/10` - 10% opacity (light backgrounds)
- `bg-primary/20` - 20% opacity (subtle highlights)
- `bg-primary/50` - 50% opacity (overlays)
- `bg-primary/90` - 90% opacity (hover states)

## Usage Examples

### Buttons
- Primary: `bg-primary text-white hover:bg-primary/90`
- Secondary: `border-2 border-primary text-primary hover:bg-primary hover:text-white`
- Outline: `border border-gray-300 hover:border-primary`

### Text
- Headings: `text-gray-900` or `text-white`
- Body: `text-gray-600`
- Links: `text-primary hover:text-primary/80`
- Muted: `text-gray-500`

### Backgrounds
- Page: `bg-white` or `bg-gray-50`
- Cards: `bg-white`
- Sections: `bg-gray-50` or `bg-primary`
- Admin: `bg-gray-100`

### Borders
- Default: `border-gray-300`
- Focus: `focus:border-primary`
- Active: `border-primary`

## Font

- **Family**: Roboto (400, 700)
- **Fallback**: -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif
