# Medora

> Your Health, Connected.

Medora is a frontend-only prototype for a digital healthcare platform. It simulates a full-care experience across three role-based workspaces — **Patient**, **Professional** (clinician), and **Organisation** — on top of a polished marketing/identity site.

Everything runs client-side with mock data and simulated authentication: no backend, no database. It exists to demonstrate UX, information architecture, and design.

---

## Stack

- **React 19** + **TypeScript** (strict) + **Vite 8**
- **React Router 7** — nested layouts and route-scoped navigation
- **Tailwind CSS v4** — CSS-first theming via `src/index.css` (`@theme` tokens), no config file
- **lucide-react** icon set
- **Oxlint** for linting
- Watch mode: `npm run build` runs `tsc -b` + `vite build`

## Getting started

```bash
npm install
npm run dev        # development server
npm run build      # typecheck + production build
npm run lint       # oxlint
npm run preview    # preview the production build
```

## Demo login

On `/login`, submit any email or password — the demo signs you in as **Ava Thompson**, patient workspace:

- Patient: `ava.thompson@example.com` · any password
- Organisation workspace: XYZ Hospital (`ORG-74PQ20`)
- Professional profile: Sharma Medical Clinic

Actual sign-in/registration is simulated (frontend-only), so every workspace is reachable through the app after the simulated sign-in.

## Routes

| Area        | Paths |
| ----------- | ----- |
| Public site | `/`, `/services`, `/about`, `/contact` |
| Auth        | `/login`, `/register`, `/register/organisation` |
| Patient     | `/patient`, `/patient/my-health/*`, `/patient/records`, `/patient/care-network`, `/patient/access`, `/patient/requests`, `/patient/messages`, `/patient/notifications`, `/patient/profile` |
| Professional| `/professional`, `/professional/patients`, `/professional/patients/:patientId`, `/professional/referrals`, `/professional/communication`, `/professional/organisations`, `/professional/notifications`, `/professional/profile` |
| Organisation| `/organisation`, `/organisation/professionals`, `/organisation/care`, `/organisation/records`, `/organisation/requests`, `/organisation/notifications`, `/organisation/profile` |

## Project structure

```
src/
├── components/        # UI primitives, shared widgets, auth & home sections
│   ├── ui/            # Button, Field/Input/Select/Textarea, cards, etc.
│   └── home/          # Landing page sections (Hero, Features, Stats, …)
├── layouts/           # Root, Public and Workspace layouts
├── pages/             # Route pages, grouped by role (patient/professional/organisation)
├── context/           # AuthContext (simulated auth state)
├── data/              # Mock content (doctors, milestones, FAQs, …)
├── hooks/             # Shared hooks (e.g. scroll-to-top)
└── index.css          # Tailwind theme tokens, fonts, shared utilities
```

## Design system

- **Fonts**: Sora (display) + DM Sans (body), loaded in `index.html`
- **Palette**: 12-step brand blue, cyan secondary, navy + semantic tokens (success/warning/danger), defined as Tailwind `@theme` tokens
- **Motion**: scroll-reveal via a shared `Reveal` component (IntersectionObserver, animates once) and `prefers-reduced-motion` respected globally — animations are flattened when the user requests reduced motion
- **Brand**: Medora India Pvt. Ltd. · support `care@medora.app`

## Notes

- Path alias `@/*` → `./src/*` is configured in `vite.config` / `tsconfig`.
- Lint uses Oxlint (`.oxlintrc`); only non-blocking warnings are expected.