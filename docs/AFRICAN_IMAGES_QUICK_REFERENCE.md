# African Images Quick Reference Guide

## 🖼️ Visual Image Map

### Homepage Images

```
┌─────────────────────────────────────────────────────────────┐
│ HOMEPAGE HERO CAROUSEL (3 rotating images)                  │
├─────────────────────────────────────────────────────────────┤
│ 1. African professionals in modern workspace                │
│    photo-1573496359142-b8d87734a5a2                         │
│                                                              │
│ 2. Diverse African team working on technology               │
│    photo-1522071820081-009f0129c71c                         │
│                                                              │
│ 3. African executives in strategic planning                 │
│    photo-1600880292203-757bb62b4baf                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ BUSINESS GROWTH SECTION                                      │
├─────────────────────────────────────────────────────────────┤
│ African business professionals collaborating                │
│ photo-1522071820081-009f0129c71c                            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ SECTORS WE SERVE (Background)                                │
├─────────────────────────────────────────────────────────────┤
│ Modern African city skyline                                  │
│ photo-1526628953301-3e589a6a8b74                            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ ACADEMY PROGRAMS                                             │
├─────────────────────────────────────────────────────────────┤
│ Full-Stack Development: African students learning tech      │
│ photo-1531482615713-2afd69097998                            │
│                                                              │
│ Digital Marketing: African professionals in meeting         │
│ photo-1557804506-669a67965ba0                               │
└─────────────────────────────────────────────────────────────┘
```

### About Page Images

```
┌─────────────────────────────────────────────────────────────┐
│ ABOUT PAGE HERO                                              │
├─────────────────────────────────────────────────────────────┤
│ African business professionals driving innovation           │
│ photo-1522071820081-009f0129c71c                            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ TEAM IMAGE COMPONENT                                         │
├─────────────────────────────────────────────────────────────┤
│ African professionals collaborating on bold ideas           │
│ photo-1522071820081-009f0129c71c                            │
└─────────────────────────────────────────────────────────────┘
```

### Services Page Images

```
┌─────────────────────────────────────────────────────────────┐
│ SERVICES PAGE HERO                                           │
├─────────────────────────────────────────────────────────────┤
│ African professionals delivering consulting services        │
│ photo-1522071820081-009f0129c71c                            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ SERVICE IMAGE COMPONENT                                      │
├─────────────────────────────────────────────────────────────┤
│ African technology professionals driving innovation         │
│ photo-1573496359142-b8d87734a5a2                            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ CROSS-INDUSTRY CAPABILITIES                                  │
├─────────────────────────────────────────────────────────────┤
│ African team collaboration on strategic initiatives         │
│ photo-1600880292203-757bb62b4baf                            │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 Image Categories

### Category 1: Business Collaboration
**Image ID**: `photo-1522071820081-009f0129c71c`
**Used In**:
- Homepage Hero (Image 2)
- Homepage Business Growth Section
- About Page Hero
- About Team Image Component
- Services Page Hero
- Image Banner Default

**Description**: African professionals in modern office, collaborative setting

---

### Category 2: Technology Innovation
**Image ID**: `photo-1573496359142-b8d87734a5a2`
**Used In**:
- Homepage Hero (Image 1)
- Services Image Component

**Description**: African tech professionals with modern technology

---

### Category 3: Strategic Planning
**Image ID**: `photo-1600880292203-757bb62b4baf`
**Used In**:
- Homepage Hero (Image 3)
- Services Cross-Industry Section

**Description**: African executives in business meeting/planning session

---

### Category 4: Urban Development
**Image ID**: `photo-1526628953301-3e589a6a8b74`
**Used In**:
- Homepage Sectors We Serve Background

**Description**: Modern African city skyline

---

### Category 5: Education & Training
**Image ID**: `photo-1531482615713-2afd69097998`
**Used In**:
- Homepage Academy Programs (Full-Stack)

**Description**: African students in learning environment

---

### Category 6: Marketing & Business
**Image ID**: `photo-1557804506-669a67965ba0`
**Used In**:
- Homepage Academy Programs (Digital Marketing)

**Description**: African professionals in business/marketing setting

---

## 🔄 Fallback Images (For Dynamic Content)

### When Admin Uploads No Image:

**Case Studies**:
- Manufacturing → `photo-1581092918056-0c4c3acd3789`
- Financial → `photo-1559526324-593bc073d938`
- Technology → `photo-1573496359142-b8d87734a5a2`

**Solutions**:
- Smart Factory → `photo-1581092918056-0c4c3acd3789`
- IoT/Tech → `photo-1573496359142-b8d87734a5a2`
- General → `photo-1522071820081-009f0129c71c`

**Insights**:
- Default → `photo-1522071820081-009f0129c71c`

---

## 📍 File Locations

```
frontend/
├── app/
│   ├── page.tsx                          [Homepage - uses NewHomePage]
│   ├── about/page.tsx                    [✅ Updated - Hero image]
│   └── services/page.tsx                 [✅ Updated - Hero + Section]
│
├── components/
│   ├── NewHome/
│   │   └── NewHomePage.tsx               [✅ Updated - Multiple images]
│   ├── About/
│   │   └── TeamImage.tsx                 [✅ Updated - Team image]
│   ├── Services/
│   │   └── ServiceImage.tsx              [✅ Updated - Service image]
│   └── ImageBanner/
│       └── ImageBanner.tsx               [✅ Updated - Default fallback]
```

---

## 🛠️ How to Change an Image

### Example: Change Homepage Hero Image 1

1. Open: `frontend/components/NewHome/NewHomePage.tsx`
2. Find line ~52: `const heroImages = [`
3. Replace first URL with new Unsplash image
4. Format: `https://images.unsplash.com/photo-[ID]?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80`

### Example: Change About Page Hero

1. Open: `frontend/app/about/page.tsx`
2. Find line ~32: `<img src="`
3. Replace URL with new image
4. Update alt text to match new image context

---

## 🔍 Finding New African Images

### Unsplash Search Terms:
- "African business team"
- "African professionals"
- "African technology"
- "African startup"
- "African office"
- "African entrepreneurs"
- "African innovation"
- "African city skyline"
- "African manufacturing"
- "African education"

### Image Requirements:
- ✅ High resolution (minimum 2000px width)
- ✅ Professional quality
- ✅ Relevant to business/technology context
- ✅ Shows African people/locations
- ✅ Modern and clean composition
- ✅ Appropriate for corporate environment

---

## 📊 Image Usage Statistics

| Image ID | Times Used | Primary Context |
|----------|------------|-----------------|
| photo-1522071820081-009f0129c71c | 6 | Business Collaboration |
| photo-1573496359142-b8d87734a5a2 | 2 | Technology Innovation |
| photo-1600880292203-757bb62b4baf | 2 | Strategic Planning |
| photo-1526628953301-3e589a6a8b74 | 1 | Urban Development |
| photo-1531482615713-2afd69097998 | 1 | Education |
| photo-1557804506-669a67965ba0 | 1 | Marketing |

**Most Used**: Business Collaboration image (6 locations)
**Reason**: Versatile, professional, represents teamwork and innovation

---

## ✅ Verification Checklist

- [x] All homepage images updated
- [x] About page images updated
- [x] Services page images updated
- [x] Component images updated
- [x] Alt text reflects African context
- [x] Images load correctly
- [x] Responsive design maintained
- [x] Performance not impacted
- [x] Fallback images defined
- [x] Documentation complete

---

## 🎯 Quick Test

### To verify all images are working:

1. **Homepage**: Check hero carousel, business growth, sectors, academy
2. **About Page**: Check hero section
3. **Services Page**: Check hero and cross-industry section
4. **Responsive**: Test on mobile, tablet, desktop
5. **Performance**: Check page load times

---

## 📞 Need Help?

**Documentation**:
- Full Implementation: `docs/AFRICAN_IMAGES_IMPLEMENTATION.md`
- Image Mapping: `docs/AFRICAN_IMAGES_MAPPING.md`
- This Quick Reference: `docs/AFRICAN_IMAGES_QUICK_REFERENCE.md`

**Image Sources**:
- Unsplash: https://unsplash.com
- License: Free for commercial use
- Attribution: Not required but appreciated

---

**Last Updated**: 2025
**Status**: ✅ Production Ready
