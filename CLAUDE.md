# CLAUDE.md — Pix3l Frontend Website Rules

---

## Step 0: Always Do First (No Exceptions)

Before writing any code or copy, invoke both skills by reading them:

- **Frontend code or UI of any kind:** Read `/mnt/skills/user/frontend-design/SKILL.md`
- **Any text, copy, or brand-adjacent content:** Read `/mnt/skills/user/pix3l-brand/SKILL.md`
- **Any technical SEO content:** Read `/mnt/skills/user/seo/SKILL.md`
- **When in doubt:** Read all three. They take seconds and prevent expensive rework.

Do not skip this step even for small edits. The skills contain rules that override defaults.

---

## Reference Images

**If a reference image is provided:**
- Match layout, spacing, typography, and color exactly
- Swap in placeholder content only (images via `https://placehold.co/WIDTHxHEIGHT` at matching aspect ratio, generic copy)
- Do not improve, add to, or reinterpret the design
- After each screenshot pass, compare against the reference image directly and list specific mismatches (e.g. "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px")
- Run at least 2 comparison rounds. Stop only when no visible differences remain, or the user says to stop.

**If no reference image is provided:**
- Design from scratch using brand guidelines and the frontend-design skill
- Commit to a clear visual direction before writing any code (see frontend-design skill Phase 1)

---

## Local Dev Server

- Always serve on `localhost`. Never screenshot a `file:///` URL.
- Start the dev server from the project root: `node serve.mjs`
- This serves the project root at `http://localhost:3000`
- `serve.mjs` lives at the project root. Paths in `serve.mjs` are relative to that root, not `/home/claude`.
- Start it in the background before taking any screenshots.
- If the server is already running, do not start a second instance. Check with `lsof -i :3000` first.
- If `serve.mjs` fails, check the error message before attempting a workaround.

---

## Screenshot Workflow

- Puppeteer is installed via npm in `node_modules/`. If missing, run `npm install` from the project root (`Pix3l Website/`).
- Chrome cache is at `C:/Users/trey/.cache/puppeteer/` on the host machine. Do not attempt to modify this path.
- Always screenshot from localhost: `node screenshot.mjs http://localhost:3000`
- Optional label suffix: `node screenshot.mjs http://localhost:3000 my-label` saves as `screenshot-N-my-label.png`
- Screenshots auto-increment to `./temporary screenshots/screenshot-N.png` and are never overwritten.
- `screenshot.mjs` lives at the project root. Use it as-is.
- After screenshotting, read the PNG from `temporary screenshots/` with the view tool to analyze it directly.

**If Puppeteer fails:**
1. Check the console error first
2. Confirm the dev server is running and responding at `http://localhost:3000`
3. Try a clean reinstall: `npm install` from the project root
4. Report the exact error to the user before attempting further workarounds

---

## File and Code Conventions

- Default output is a single `index.html` file with all styles inline, unless the user specifies otherwise
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Never use default Tailwind colors (indigo-500, blue-600, etc.). All colors must come from the Pix3l palette (see Brand Assets below)
- Mobile-first responsive layout, always
- When editing existing files: edit `index.html` in place unless the user asks for a new file
- When starting from scratch: create `index.html` fresh in the project root

---

## Brand Assets

All assets live in `assets/` relative to the project root. Never use placeholder images where real assets exist.

| Asset | Path |
|---|---|
| Favicon | `favicon.svg` — always include `<link rel="icon" type="image/svg+xml" href="favicon.svg">` in every page `<head>` |
| Logo (dark bg, with tagline) | `assets/logos/logo-digital-works-white.svg` |
| Logo (dark bg, no tagline) | `assets/logos/logo-meet-dark-white.svg` |
| Hero background | `assets/images/hero/welcome-hero.png` |
| Agentic Blocks | `assets/images/backgrounds/agentic-blocks.png` |
| Digital Wave | `assets/images/backgrounds/digital-wave.png` |
| Portfolio: Telespine | `assets/images/projects/telespine/` |
| Portfolio: Viper RC | `assets/images/projects/viper-rc/` |
| Portfolio: Newmont Mining | `assets/images/projects/newmont/` |
| Icons | `assets/icons/` |
| Isometric Icons | `assets/images/isometric/` |
| Cascade Agents | `assets/cascade/agents/` (syra, oracle, echo, nikola, iris, davinci, chronos, atlas, nova, viki) |
| Cascade Logos | `assets/cascade/cascade-logo.svg`, `assets/cascade/cascade-logo-clear.svg` |

**If an asset path does not resolve:**
- Do not silently fall back to a placeholder
- Report the missing path to the user and ask how to proceed

### SVG Rendering

If an SVG logo does not render correctly in the browser (blank, broken, wrong size), fall back to the PNG version of the same logo if one exists in the same folder. Report the fallback to the user.

---

## Color Palette

Never hardcode arbitrary colors. All color values must be pulled from this palette. See the pix3l-brand skill for the full token set including secondary, tertiary, and error colors.

| Name | Hex | Primary Use |
|---|---|---|
| Big Red | `#FF1635` | Primary CTA, high-energy accents |
| Pinky | `#FF1673` | Secondary accent, hover states |
| Purple | `#A100FF` | Accent, creative energy |
| Vista Blue | `#8599FF` | Softer accent, UI elements |
| Navy | `#000947` | Dark section backgrounds |
| Dark Navy | `#000623` | Deepest background layer |
| Night | `#0A0A0A` | Near-black surface |

---

## Typography

Pix3l uses a three-font system. Apply consistently:

| Role | Font | Notes |
|---|---|---|
| Display / Headings | Space Grotesk | Weights 300, 500, 700. Tight tracking (`-0.03em`) on large sizes. |
| Body copy | Inter | Weight 500 standard, 700 emphasis, 300 secondary. Line-height 1.7. |
| Monospace | JetBrains Mono | Code, technical labels, UI data display. |

Do not use the same font for headings and body. Do not substitute neutral system fonts.

---

## Design Guardrails

These apply to every build, no exceptions.

**Colors**
- Never use default Tailwind palette values
- All colors derive from the Pix3l brand palette above

**Shadows**
- Never use flat single-layer shadows like `shadow-md`
- Use layered, color-tinted shadows with low opacity (two or three layers at different offsets and blurs)

**Gradients**
- Layer multiple radial gradients
- Add grain/texture via SVG noise filter for depth on large surfaces

**Animations**
- Only animate `transform` and `opacity`
- Never use `transition-all`. Always name the specific property: `transition-opacity`, `transition-transform`, etc.
- Default easing: `cubic-bezier(0.4, 0, 0.2, 1)`
- Always include `@media (prefers-reduced-motion: reduce)` overrides

**Interactive States**
- Every clickable element requires hover, focus-visible, and active states
- No exceptions. No bare `cursor: pointer` without a visible state change

**Images**
- Add a gradient overlay (`bg-gradient-to-t from-black/60`) on hero and card images
- Add a color treatment layer with `mix-blend-multiply` where appropriate

**Spacing**
- Use a consistent base-8 spacing scale. Do not use arbitrary Tailwind steps.
- Define tokens: `--space-1: 4px`, `--space-2: 8px`, `--space-4: 16px`, `--space-6: 24px`, `--space-8: 32px`, `--space-12: 48px`, `--space-16: 64px`

**Depth**
- Surfaces must use a layering system: base, elevated, floating
- Never place all elements at the same visual z-plane

---

## Copy and Brand Voice

When writing any text content, read the pix3l-brand skill first. Key rules that apply everywhere:

- No em dashes anywhere in copy
- No corporate filler ("leverage synergies," "robust solutions," "cutting-edge")
- No over-hedging ("we think," "possibly," "might be able to")
- Active voice throughout
- Product names are exact: Cascade, CRUNCH, VIKI

---

## Before You Ship: Pre-Delivery Checklist

Before presenting any output to the user:

**Code**
- [ ] Both skills were read at the start of this session
- [ ] No `transition-all` anywhere in the file
- [ ] No default Tailwind blue/indigo as primary color
- [ ] All colors reference the Pix3l palette
- [ ] Space Grotesk for headings, Inter for body, JetBrains Mono for code
- [ ] Every interactive element has hover, focus-visible, and active states
- [ ] Animations use only `transform` and `opacity`
- [ ] `prefers-reduced-motion` overrides are present
- [ ] Real brand assets used wherever available; no silent placeholder fallbacks

**Screenshots**
- [ ] Screenshot was taken from `localhost:3000`, not a `file:///` path
- [ ] At least 2 comparison rounds completed against reference (if provided)
- [ ] All visible mismatches resolved or explicitly reported to user

**Copy**
- [ ] No em dashes in any copy
- [ ] Product names capitalized correctly
- [ ] Active voice, no corporate filler

---

## Hard Rules

These are immutable. No exceptions, no user override.

1. Always read the skill files before starting. Every session.
2. Never screenshot a `file:///` URL.
3. Never use `transition-all`.
4. Never use default Tailwind blue/indigo as primary color.
5. Never add sections, features, or content not present in the reference.
6. Never "improve" a reference design. Match it.
7. Never stop after one screenshot pass when a reference is provided.
8. Never use em dashes in any copy or content.
9. Never silently fall back to a placeholder when a real asset path fails. Report it.
10. Never use the same font for headings and body copy.