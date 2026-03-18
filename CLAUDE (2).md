# CLAUDE.md — Stack'd Project Context

## Project Overview
**Stack'd** is a luxury scroll-animation website for a premium burger brand.
- Stack: Next.js 14 (App Router, TypeScript), Tailwind CSS, HTML5 Canvas API
- No Three.js. No GSAP. Canvas only.
- Fonts: Bebas Neue (display) + Playfair Display (headings) + Inter (body) from Google Fonts
- Deploy target: Vercel

---

## Brand Identity
| Key | Value |
|-----|-------|
| Name | Stack'd |
| Tagline | Built Different. |
| Sub-tagline | Every ingredient chosen with obsessive intent. |
| Aesthetic | Five Guys meets A24 film meets Apple.com — dark, moody, cinematic |
| Feel | A restaurant that only opens at night. Bold, warm, hunger-inducing. |

---

## Color System
```css
--bg-deep:       #080400;   /* near-black warm — main background */
--bg-section:    #120800;   /* deep warm black */
--bg-card:       #1C0E00;   /* card background */
--toasted:       #D4840A;   /* toasted gold — primary accent */
--toasted-light: #F0A830;   /* bright gold — glows */
--green:         #4CAF50;   /* fresh green — lettuce accent */
--green-dark:    #2E7D32;   /* dark green */
--red:           #CC2200;   /* ketchup red — danger accent */
--cream:         #FFF8E7;   /* warm cream — primary text */
--cream-muted:   #C8A870;   /* warm tan — secondary text */

--gradient-hero: linear-gradient(180deg, #080400 0%, #120800 50%, #080400 100%);
--gradient-gold: linear-gradient(135deg, #D4840A 0%, #F0A830 50%, #D4840A 100%);
--gradient-text: linear-gradient(135deg, #FFF8E7 0%, #D4840A 50%, #F0A830 100%);
```

---

## Typography System

### Google Fonts Import (in `layout.tsx`)
- **Bebas Neue**: weight 400 (display headlines only)
- **Playfair Display**: weights 400, 700 (include italic variants)
- **Inter**: weights 300, 400, 500, 600

### Scale (desktop)
| Role | Size | Weight | Letter-spacing | Font | Notes |
|------|------|--------|---------------|------|-------|
| Display | 120px | 400 | 4px | Bebas Neue | UPPERCASE only |
| H1 | 80px | 400 | 2px | Bebas Neue | UPPERCASE |
| H2 | 56px | 700 | — | Playfair Display | |
| H3 | 28px | 600 | — | Inter | |
| Body | 16px | 300 | — | Inter | line-height 1.85 |
| Caption | 11px | 500 | 4px | Inter | UPPERCASE |
| CTA | 13px | 600 | 3px | Inter | UPPERCASE |

---

## Scroll Animation Architecture

### Source
- Video file: `scroll-animation.mp4` in project root
- Extract frames: `ffmpeg -i scroll-animation.mp4 -vf fps=30 public/frames/frame_%04d.webp`
- Output format: `.webp` to `/public/frames/`

### Canvas Setup
- Full viewport, `position: sticky`, background `#080400`
- Total scroll height: **500vh**
- Frame driven by scroll progress (0–1)
- Warm radial glow behind canvas: `radial-gradient(rgba(212,132,10,0.05) at center)` — subtle hunger-inducing warmth

### 3-Act Story
| Act | Scroll % | Scene |
|-----|----------|-------|
| 1 | 0–28% | All ingredients floating separately in void above |
| 2 | 30–68% | Stack one by one — bun, patty, cheese, lettuce, tomato, bun |
| 3 | 72–100% | Perfect assembled burger gleaming, steam rising, sesame seeds settle |

---

## Text Overlay Specs

### Section 1 — Built Different (visible 0%–22%)
- **Position**: bottom-left, 10% from left, 15% from bottom
- **Label**: `100% GRASS-FED` — 11px Inter, letter-spacing 4px, color `#D4840A`, uppercase
- **Headline**: `"BUILT\nDIFFERENT."` — 110px Bebas Neue, letter-spacing 4px, uppercase, gradient text `#FFF8E7 → #D4840A`, line-height 0.9
- **Subtext**: `"Every ingredient chosen with obsessive intent."` — 16px Inter weight 300, color `#C8A870`, margin-top 24px

### Section 2 — Layer by Layer (visible 30%–55%)
- **Position**: top-right, 8% from right, 18% from top
- **Label**: `LAYER BY LAYER` — same label style
- **Headline**: `"LAYER\nBY\nLAYER."` — 88px Bebas Neue, letter-spacing 3px, color `#FFF8E7`, each word its own line
- **Subtext**: `"Fresh. Real. Uncompromising."` — color `#C8A870`

### Section 3 — The Stack is Perfect (visible 60%–78%)
- **Position**: center, perfectly centered horizontally
- **Label**: `THE STACK IS PERFECT` — centered
- **Headline**: `"THE STACK\nIS PERFECT."` — 96px Bebas Neue, letter-spacing 4px, gradient `#D4840A → #F0A830 → #FFF8E7`, centered
- **Subtext**: `"100% grass-fed. Always fresh. Never frozen."` — centered, color `#C8A870`

### Section 4 — CTA (visible 84%–100%)
- **Position**: perfectly centered
- **Headline**: `"ORDER THE\nOBSESSION."` — 104px Bebas Neue, letter-spacing 4px, color `#FFF8E7`, centered
- **Subtext**: `"Now open. Always worth the wait."` — 15px Inter, color `#C8A870`, centered
- **CTA Button**:
  - Text: `FIND YOUR NEAREST →`
  - 13px Inter, weight 600, letter-spacing 3px
  - Background: `linear-gradient(135deg, #D4840A, #F0A830)`
  - Color: `#080400`
  - Padding: `20px 56px`
  - Border-radius: `0px` (sharp — no softness)
  - Hover: `scale(1.04)` with `0.25s ease`
  - Box-shadow: `0 0 60px rgba(212, 132, 10, 0.5)`
- **Secondary link** below button:
  - `View Full Menu` — 13px Inter, color `#D4840A`, underline on hover, margin-top 20px

---

## Navbar

- Fixed, full width, initially transparent
- After scroll past 80px: `background: rgba(8,4,0,0.90)`, `backdrop-filter: blur(24px)`
- **Left**: `STACK'D` — 16px Bebas Neue, letter-spacing 5px, color `#FFF8E7`
- **Right links**: `Menu` `Locations` `Story` — 12px Inter, letter-spacing 2px, color `#C8A870`, hover → `#D4840A` with 0.25s transition
- **Far right button**: `ORDER NOW`
  - Background: `#D4840A`, color `#080400`, padding `9px 22px`, border-radius `2px`
  - Font: 12px Inter, weight 600, letter-spacing 2px
  - Hover: `background #F0A830`

---

## Loading Screen

- Background: `#080400`
- Center: `STACK'D` — 18px Bebas Neue, letter-spacing 8px, color `#D4840A`
- Below brand: `LOADING THE GOOD STUFF...` — 10px Inter, letter-spacing 3px, color `#C8A870`
- Progress bar: 240px wide, 2px height
  - Track: `rgba(255,255,255,0.08)`
  - Fill: `linear-gradient(90deg, #D4840A, #F0A830)`
- Below bar: percentage counter — 11px Inter, color `#C8A870`
- Dismiss: `0.6s` opacity fade when frames fully loaded
- **Site does not render until 100% of frames are preloaded**

---

## Below-Fold Sections

### Ingredients Section
- Background: `#120800`
- Title: `WHAT GOES IN.` — 64px Bebas Neue, letter-spacing 3px, color `#FFF8E7`
- 4 ingredient cards in a row:
  - Card bg: `#1C0E00`, border-top: `2px solid #D4840A`, padding `36px 28px`
  - SVG icon (beef / lettuce / cheese / bun) in respective accent colors
  - Name: 20px Bebas Neue, letter-spacing 2px, color `#FFF8E7`
  - Description: 14px Inter weight 300, color `#C8A870`
  - Hover: `translateY(-6px)`, `border-top-color #F0A830`

### Stats Section
- Background: `#080400`, full bleed
- 3 large centered stats:
  | Stat | Label |
  |------|-------|
  | `100%` | `GRASS-FED` |
  | `0` | `FROZEN INGREDIENTS` |
  | `14hrs` | `PREP TO PLATE` |
  - Stat number: 72px Bebas Neue, color `#D4840A`
  - Stat label: 11px Inter, letter-spacing 4px, color `#C8A870`
  - Dividers between stats: `1px vertical rgba(212,132,10,0.2)`

### Locations Section
- Background: `#120800`
- Title: `FIND US.` — 64px Bebas Neue, color `#FFF8E7`
- City list with gold highlight on hover
- Bottom full-width CTA banner:
  - Background: `linear-gradient(135deg, #D4840A, #F0A830)`
  - Text: `ORDER ONLINE` — 28px Bebas Neue, color `#080400`, centered

---

## Micro-Details (Non-Negotiable)

### Grain Texture Overlay
```css
/* Full page, pointer-events: none, z-index top */
/* SVG feTurbulence filter noise */
opacity: 0.03;
position: fixed;
inset: 0;
pointer-events: none;
```

### Scroll Progress Bar
- `position: fixed`, top 0, left 0
- `height: 2px`
- `background: linear-gradient(90deg, #D4840A, #CC2200, #4CAF50)` — gold → red → green (burger ingredients)
- Width driven by `window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100`

### Custom Cursor
- Inner: 10px filled circle, color `#D4840A`
- Outer: 32px ring, `border: 1px solid #D4840A`, follows with ~100ms lag
- On CTA hover: ring fills `rgba(212,132,10,0.30)`

### Warm Canvas Glow
- `radial-gradient(rgba(212,132,10,0.05) at center)` positioned behind canvas
- Very subtle — just enough warmth to make the burger feel lit

### Page Transition
- Fade in on load: `opacity 0 → 1` over `0.5s`

---

## Performance Rules

- Preload ALL frames before showing any content
- Use `requestAnimationFrame` for canvas rendering — never `setInterval`
- Mobile (`< 768px`): skip every 2nd frame
- Cache frames in `next.config.js`:
```js
async headers() {
  return [{ source: '/frames/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] }]
}
```
- All frame images must be `.webp`

---

## SEO & Metadata (`layout.tsx`)

```ts
export const metadata = {
  title: "Stack'd — Built Different. Premium Burgers.",
  description: 'Every ingredient chosen with obsessive intent. 100% grass-fed. Always fresh. Never frozen.',
  themeColor: '#080400',
  openGraph: {
    images: ['/frames/frame_0001.webp'],
  },
}
```

---

## File Structure Reference

```
/
├── public/
│   └── frames/               ← .webp frames extracted from video
├── app/
│   ├── layout.tsx             ← fonts, metadata, grain overlay, cursor
│   ├── page.tsx               ← main scroll page
│   └── globals.css            ← CSS variables, base resets
├── components/
│   ├── Navbar.tsx
│   ├── LoadingScreen.tsx
│   ├── ScrollCanvas.tsx       ← Canvas + frame animation + warm glow
│   ├── TextOverlay.tsx        ← Section text with opacity transitions
│   ├── IngredientsSection.tsx
│   ├── StatsSection.tsx
│   ├── LocationsSection.tsx
│   └── FinalCTA.tsx
├── hooks/
│   └── useScrollProgress.ts
├── scroll-animation.mp4
└── next.config.js
```

---

## Claude Code Behavior Rules

- Never use Three.js, GSAP, Framer Motion, or any animation library — Canvas + CSS only
- Every color must reference the CSS variable system above — no hardcoded hex in components
- Bebas Neue is for display/impact only — never use it for body copy, captions, or subtext
- Tailwind for layout/spacing only; typography and color styles via CSS variables
- Always build mobile-responsive (frame-skip logic on < 768px)
- Prioritize perceived performance: loading screen → instant canvas → lazy below-fold sections
- The scroll progress bar gradient (`gold → red → green`) is intentional and non-negotiable — it mirrors the burger layers
- Every section must feel moody, warm, and hunger-inducing — check the design philosophy before writing any new component
