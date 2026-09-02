# Negentro & PiyAPI — Agent Architecture & Developer Guide (`claude.md`)

This document provides a comprehensive technical guide for any AI agent or software engineer working on this repository. Follow all patterns, architectural decisions, and development guidelines detailed below when updating, refactoring, or extending the codebase.

---

## 1. Project Overview & Tech Stack

**Negentro** is a foundational cognitive memory engine and AI agent infrastructure platform. **PiyAPI** is its developer-facing memory API service.

### Core Technology Stack:
- **Framework**: React 19 (`react`, `react-dom`)
- **Build Tool**: Vite 6 (`vite`, `@vitejs/plugin-react`)
- **Language**: TypeScript 5.8+ (Strict mode, `tsc -b --noEmit`)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`, `@import "tailwindcss";` with `@theme inline` tokens in `src/index.css`)
- **Animation & Graphics**:
  - GSAP (`gsap` timelines and tweens)
  - Custom WebGL & WebGL2 fragment/vertex shaders (Fluid simulation, Velaris noise shader, Cosmic FBM mesh)
- **Icons**: Lucide React (`lucide-react`)
- **Backend & Database**: Supabase JS (`@supabase/supabase-js`)
- **Scheduling**: Calendly Embed (`react-calendly`)

---

## 2. Repository Structure

```
├── public/
│   ├── assets/               # Production SVGs & images for sections
│   │   ├── AI Agents.svg
│   │   ├── Conversational AI.svg
│   │   ├── Enterprise Knowledge.svg
│   │   ├── High-Stakes.svg
│   │   ├── Multi-Agents.svg
│   │   ├── RAG Systems.svg
│   │   ├── context-problem.svg
│   │   ├── cta-bg-frame88.jpg
│   │   ├── native-problem.svg
│   │   ├── piyapi-check-badge.svg
│   │   ├── piyapi-logo-exact.svg
│   │   ├── research-butterfly.svg
│   │   ├── research-image-2.svg
│   │   ├── research-image-3.svg
│   │   └── wrappers-problem.svg
│   ├── logos/                # Partner & brand vector logos (negentro, notion, claude, modal, mongoDB)
│   └── wait-illustration.svg # Coming-soon placeholder graphic
├── src/
│   ├── components/           # Core page section components
│   │   ├── ui/               # Reusable UI primitives & shader canvas components
│   │   │   ├── blue-meshy-background.tsx   # WebGL2 FBM domain-warped dynamic background
│   │   │   ├── cta-with-text-marquee.tsx   # CTA section with vertical text marquee
│   │   │   ├── MemoryVerificationDemo.tsx  # Interactive step-by-step memory simulation
│   │   │   ├── negentro-footer-logo.tsx    # Footer brand vector
│   │   │   ├── ruixen-gradient-footer.tsx  # Scroll-reactive footer bottom glow
│   │   │   └── velaris.tsx                 # WebGL Simplex noise shader for CTA
│   │   ├── CalendlyModal.tsx               # Lazy-loaded scheduling modal
│   │   ├── CodeIntegrationSection.tsx      # Multi-language SDK integration code viewer
│   │   ├── CtaSection.tsx                  # Wrapper for CTA marquee section
│   │   ├── DifferentApproachSection.tsx    # SOTA metrics & architectural comparison table
│   │   ├── FluidBackground.tsx             # Interactive Hero WebGL fluid simulation
│   │   ├── Footer.tsx                      # 6-column footer with language selector buttons
│   │   ├── Hero.tsx                        # Hero headline, subtext & Supabase waitlist form
│   │   ├── Logos.tsx                       # Partner SVG logos
│   │   ├── MemoryParadigmSection.tsx       # 3-card tabbed problem breakdown
│   │   ├── Navbar.tsx                      # Header navigation with subpage routing & console CTA
│   │   ├── PartnerLogos.tsx                # Infinite marquee for partner logos
│   │   ├── ResearchPapersSection.tsx       # Research papers 3-column card grid
│   │   ├── SecurityComplianceSection.tsx   # Privacy, security cards & moving primitives marquee
│   │   ├── TryPiyApiModal.tsx              # Lazy-loaded interactive memory console modal
│   │   ├── WaitPage.tsx                    # Coming-soon subpage template (Research, Pricing, etc.)
│   │   └── WorkflowsSection.tsx            # 6-card workflow architecture showcase
│   ├── lib/
│   │   ├── i18n.tsx          # 5-language translation dictionaries, LanguageProvider & useLanguage() hook
│   │   ├── supabase.ts       # Supabase client & waitlist email submission handler
│   │   └── utils.ts          # clsx + twMerge utility function (`cn`)
│   ├── App.tsx               # Root component with dynamic routes, modals & LanguageProvider
│   ├── index.css             # Tailwind v4 theme tokens, animations & scrollbar utilities
│   ├── main.tsx              # React DOM root mounting
│   └── vite-env.d.ts         # TypeScript environment declarations
├── index.html                # HTML entry point with DM Sans & JetBrains Mono font preconnects
├── vite.config.ts            # Vite config with manual chunking & build optimization
└── package.json              # Project dependencies and npm scripts
```

---

## 3. Design System & Aesthetic Standards

### Typography:
- **Body & Headlines**: `"DM Sans"`, system-ui, sans-serif
- **Code & Metrics**: `"JetBrains Mono"`, monospace

### Color Palette:
- **Hero Dark Background**: `#04050c`
- **PiyAPI Electric Violet**: `#765DFB`
- **Deep Royal Violet**: `#6320EE` / `#5146B8` / `#37338C`
- **Soft Lilac Accent**: `#ECCDF5` / `#F2EFFE`
- **Dark Neutral Text**: `#0B1015` / `#0F1123` / `#1A1935`
- **Muted Text / Border**: `#888E94` / `#8F9FA3` / `#2D2A54`/30

### Design Guidelines:
- **Ultra-Premium Finish**: Use rich gradients, subtle glassmorphism (`backdrop-blur-xl`), smooth hover micro-interactions, and 60fps GPU-accelerated animations.
- **Strict Aspect Ratios**: All media containers must enforce explicit aspect ratios or `width`/`height` attributes to prevent Cumulative Layout Shift (CLS).

---

## 4. Key Subsystems & Implementation Details

### A. Internationalization (i18n) (`src/lib/i18n.tsx`)
- **Languages Supported**:
  1. `en` (English — Default)
  2. `es` (Spanish)
  3. `fr` (French)
  4. `de` (German)
  5. `ru` (Russian)
- **Usage**:
  ```tsx
  import { useLanguage } from "@/lib/i18n"
  
  export function MyComponent() {
    const { language, setLanguage, t } = useLanguage()
    return <h2>{t.hero.headlineMemory}</h2>
  }
  ```
- **Language Switcher**: Located in [`src/components/Footer.tsx`](file:///src/components/Footer.tsx). Buttons (`En`, `Es`, `Fr`, `De`, `Ru`) invoke `setLanguage(code)`. Active selection is underlined in violet. State is persisted in `localStorage` under `negentro_lang` and synchronized to `<html lang="...">`.

### B. Supabase Waitlist Integration (`src/lib/supabase.ts`)
- **Table**: `public.waitlist`
- **Columns**: `id UUID`, `email TEXT UNIQUE`, `created_at TIMESTAMPTZ`
- **Environment Variables**:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- **Submission Helper**: `submitWaitlistEmail(email: string)` returns `{ success: boolean, isDuplicate?: boolean, message: string }`.
- **Duplicate Handling**: Catches Postgres error code `23505` to provide friendly duplicate feedback without throwing errors.

### C. WebGL Performance & Viewport Throttling
All canvas and shader components (`FluidBackground.tsx`, `velaris.tsx`, `blue-meshy-background.tsx`, `MemoryVerificationDemo.tsx`) adhere to strict performance rules:
1. **IntersectionObserver Pause**: Animation RAF loops pause when the component is scrolled off-screen (`isVisible === false`).
2. **Tab Inactivity Pause**: RAF loops pause when `document.hidden === true`.
3. **DPR Clamping**: Device Pixel Ratio is clamped via `Math.min(window.devicePixelRatio || 1, 2)` to eliminate mobile memory pressure.
4. **Memory Clean-up**: All WebGL programs, buffers, framebuffers, textures, and observers are explicitly deleted/disconnected on component unmount.

### D. Code Splitting & Lazy Loading
- Heavy modals (`TryPiyApiModal`, `CalendlyModal`) and non-initial subpages (`WaitPage`) are loaded on-demand via `React.lazy` and `Suspense`.
- `vite.config.ts` splits vendor libraries into distinct cache chunks (`vendor-react`, `vendor-supabase`, `vendor-animations`, `vendor-icons`, `vendor-libs`), keeping the initial main JS bundle under 220 kB.

---

## 5. Agent Development & Synchronization Rules

When working on this repository, all agents MUST follow these mandatory rules:

1. **Dual Workspace Synchronization**:
   - The project is mirrored between `c:\Users\aashu\Desktop\Negentro-UI` and `d:\Negentro\Piyapi-by-Negentro`.
   - Every file change made in one directory MUST be copied to the other directory.
   - Do NOT create extra temporary markdown files or analysis scripts in the production directory.

2. **Browser Interaction Rule**:
   - Never open or automate external browsers; the user tests UI directly in their local environment.

3. **Code & Comment Standards**:
   - Maintain clean, humanized, concise comments. Avoid verbose AI banners, conversational filler, or boilerplate disclaimers.
   - Do NOT add unnecessary `"use client"` directives (this is a Vite SPA, not Next.js).
   - Ensure all `img` tags include `loading="lazy"`, `decoding="async"`, and descriptive `alt` tags.

4. **Verification Protocol**:
   After any code modification, always verify both codebases:
   ```bash
   # 1. Verify TypeScript types (must exit with 0 errors)
   npm run check-types
   
   # 2. Verify Production Build (must build in <10s with 0 warnings)
   npm run build
   ```
