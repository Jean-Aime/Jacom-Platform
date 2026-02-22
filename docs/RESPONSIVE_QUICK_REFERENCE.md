# 📱 RESPONSIVE DESIGN - QUICK REFERENCE

## 🎯 Breakpoints
```
Mobile:    320px - 767px   (Base styles)
Tablet:    768px - 1023px  (md:)
Desktop:   1024px - 1279px (lg:)
Large:     1280px+         (xl:)
XL:        1536px+         (2xl:)
```

---

## 🚀 Quick Start Classes

### Layout
```html
<!-- Responsive Container -->
<div class="container-responsive">...</div>

<!-- Responsive Grid (1→2→3→4 cols) -->
<div class="grid-responsive">...</div>

<!-- Responsive Flex (col→row) -->
<div class="flex-responsive">...</div>
```

### Spacing
```html
<!-- Responsive Section Padding -->
<section class="section-padding">...</section>

<!-- Responsive Card -->
<div class="card-responsive">...</div>
```

### Visibility
```html
<!-- Hide on mobile, show on desktop -->
<div class="hide-mobile">...</div>

<!-- Show only on mobile -->
<div class="show-mobile">...</div>

<!-- Hide on tablet -->
<div class="hide-tablet">...</div>

<!-- Hide on desktop -->
<div class="hide-desktop">...</div>
```

---

## 🎨 Admin Classes

### Tables
```html
<div class="admin-table-container">
  <table class="admin-table">...</table>
</div>
```

### Forms
```html
<form class="admin-form">
  <input type="text" />
  <input type="email" />
  <textarea class="full-width"></textarea>
</form>
```

### Grids
```html
<!-- Stats Grid (1→2→4) -->
<div class="admin-stats">...</div>

<!-- Card Grid (1→2→3→4) -->
<div class="admin-card-grid">...</div>
```

### Buttons
```html
<!-- Vertical mobile, horizontal desktop -->
<div class="admin-button-group">
  <button>Save</button>
  <button>Cancel</button>
</div>
```

### Actions
```html
<div class="admin-actions">
  <button>Action 1</button>
  <button>Action 2</button>
</div>
```

---

## 📐 Tailwind Responsive

### Syntax
```html
<!-- Mobile first approach -->
<div class="text-sm md:text-base lg:text-lg">
  Responsive text size
</div>

<!-- Hidden on mobile, visible on desktop -->
<div class="hidden lg:block">Desktop only</div>

<!-- Visible on mobile, hidden on desktop -->
<div class="block lg:hidden">Mobile only</div>
```

### Common Patterns
```html
<!-- Responsive Padding -->
<div class="p-4 md:p-6 lg:p-8">...</div>

<!-- Responsive Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">...</div>

<!-- Responsive Flex -->
<div class="flex flex-col md:flex-row">...</div>

<!-- Responsive Width -->
<div class="w-full md:w-1/2 lg:w-1/3">...</div>

<!-- Responsive Text -->
<h1 class="text-2xl md:text-3xl lg:text-4xl">...</h1>
```

---

## 🎯 Admin Mobile Menu

### Implementation
```tsx
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

// Toggle button
<button 
  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  className="lg:hidden"
>
  <MenuIcon />
</button>

// Sidebar
<aside className={`
  fixed inset-y-0 left-0 w-64 z-50
  transition-transform duration-300
  lg:translate-x-0
  ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
`}>
  {/* Navigation */}
</aside>

// Overlay
{mobileMenuOpen && (
  <div 
    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
    onClick={() => setMobileMenuOpen(false)}
  />
)}
```

---

## 📱 Touch Optimization

### Minimum Sizes
```css
/* All interactive elements */
button, a, input[type="checkbox"] {
  min-height: 44px;
  min-width: 44px;
}
```

### Touch-Friendly Spacing
```html
<!-- Adequate spacing between touch targets -->
<div class="space-y-4 md:space-y-2">
  <button>Button 1</button>
  <button>Button 2</button>
</div>
```

---

## 🎨 Typography Scale

```html
<!-- Responsive Headings -->
<h1 class="text-3xl md:text-4xl lg:text-5xl">Main Title</h1>
<h2 class="text-2xl md:text-3xl lg:text-4xl">Section Title</h2>
<h3 class="text-xl md:text-2xl lg:text-3xl">Subsection</h3>

<!-- Responsive Body Text -->
<p class="text-sm md:text-base">Body text</p>
```

---

## 🖼️ Images & Media

### Responsive Images
```html
<!-- Always responsive -->
<img 
  src="image.jpg" 
  alt="Description"
  class="w-full h-auto"
/>

<!-- With aspect ratio -->
<div class="aspect-video">
  <img src="image.jpg" class="w-full h-full object-cover" />
</div>
```

### Responsive Video
```html
<div class="video-responsive">
  <iframe src="video-url"></iframe>
</div>
```

---

## 📊 Common Patterns

### Hero Section
```html
<section class="section-padding">
  <div class="container-responsive">
    <div class="flex-responsive items-center">
      <div class="w-full lg:w-1/2">
        <h1 class="text-3xl md:text-4xl lg:text-5xl">Title</h1>
        <p class="text-sm md:text-base mt-4">Description</p>
      </div>
      <div class="w-full lg:w-1/2">
        <img src="hero.jpg" class="w-full" />
      </div>
    </div>
  </div>
</section>
```

### Card Grid
```html
<div class="container-responsive section-padding">
  <div class="grid-responsive">
    <div class="card-responsive">Card 1</div>
    <div class="card-responsive">Card 2</div>
    <div class="card-responsive">Card 3</div>
  </div>
</div>
```

### Admin Dashboard
```html
<div class="admin-content">
  <!-- Stats -->
  <div class="admin-stats mb-6">
    <div class="admin-widget">Stat 1</div>
    <div class="admin-widget">Stat 2</div>
    <div class="admin-widget">Stat 3</div>
    <div class="admin-widget">Stat 4</div>
  </div>
  
  <!-- Table -->
  <div class="admin-table-container">
    <table class="admin-table">...</table>
  </div>
</div>
```

---

## ⚡ Performance Tips

1. **Use CSS classes** instead of inline styles
2. **Minimize media queries** - use utility classes
3. **Optimize images** - use appropriate sizes
4. **Lazy load** - defer off-screen content
5. **Test on real devices** - not just browser tools

---

## 🔍 Testing Commands

### Browser DevTools
```
F12 → Toggle Device Toolbar (Ctrl+Shift+M)
```

### Test Sizes
- iPhone SE: 375x667
- iPhone 12: 390x844
- iPad: 768x1024
- Desktop: 1920x1080

---

## ✅ Checklist

- [ ] No horizontal scroll on mobile
- [ ] Touch targets ≥ 44px
- [ ] Text readable (≥14px)
- [ ] Images scale properly
- [ ] Forms full-width on mobile
- [ ] Tables scroll horizontally
- [ ] Navigation accessible
- [ ] Buttons stack on mobile

---

## 🆘 Common Issues & Fixes

### Issue: Horizontal scroll on mobile
```css
/* Fix */
body { overflow-x: hidden; }
* { max-width: 100%; }
```

### Issue: Text too small on mobile
```html
<!-- Use responsive text classes -->
<p class="text-sm md:text-base">Text</p>
```

### Issue: Buttons too small to tap
```css
/* Ensure minimum touch target */
button { min-height: 44px; min-width: 44px; }
```

### Issue: Table overflow
```html
<!-- Wrap in scrollable container -->
<div class="admin-table-container">
  <table class="admin-table">...</table>
</div>
```

---

## 📚 Quick Links

- Full Documentation: `docs/RESPONSIVE_DESIGN_COMPLETE.md`
- Global CSS: `frontend/app/globals.css`
- Admin CSS: `frontend/app/admin/admin-responsive.css`
- Tailwind Config: `frontend/tailwind.config.ts`

---

**Status**: ✅ Production Ready  
**Last Updated**: 2024
