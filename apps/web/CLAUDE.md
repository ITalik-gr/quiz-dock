# Quiz Dock — web

Next.js (App Router) front end of Quiz Dock. Root context: `../../CLAUDE.md`.

Unlike the rest of the repo, **here you may write code**: page markup, components, styling. Data fetching, API calls and state logic I write myself unless I ask; use static placeholder data and leave clear spots for it.

## Stack

- Next.js App Router, TypeScript
- Tailwind CSS v4 (latest), configured in CSS (`@theme`), no `tailwind.config.js`
- shadcn/ui for base elements (Button, Input, Card, Dialog, Tabs, Badge, Skeleton…). Components are copied into `components/ui` and may be edited freely. Add new ones with `pnpm dlx shadcn@latest add <name>`
- Icons: `lucide-react`
- Shared types and schemas: `@quiz/shared`

## Design

Light, calm, product-like UI. Reference: a clean SaaS app (left sidebar, top breadcrumb bar, large page header, cards with thin borders).

- Backgrounds: white `#ffffff` for content, very light gray `#f7f7f7`–`#fafafa` for the sidebar and drop zones
- Text: near-black `#111111` for headings, `#3f3f46` body, `#71717a` secondary
- Borders: `#e7e7e7`, 1px. Dashed borders for drop zones
- One accent color: blue `#3b4fd8` (links, active states, small labels above titles). Used sparingly
- Primary buttons: black background, white text, fully rounded (`rounded-full`). Secondary: white with border, rounded-full
- Radius: cards `rounded-[16px]`, inputs `rounded-[12px]`
- Big bold page titles (`text-[44px] font-bold tracking-[-0.02em]` on desktop), generous whitespace
- No shadows or very subtle ones; no gradients. A decorative element in the header (e.g. pixel pattern in accent tones) is fine
- Layout: fixed left sidebar (navigation, recent sessions), content on the right with a max width. Must work on mobile: sidebar collapses into a sheet/drawer

## Class style

Group classes by breakpoint and separate groups with ` | `:

```tsx
<h1 className="text-[28px] font-bold leading-[1.1] | sm:text-[36px] | lg:text-[44px]">
```

- Base (mobile) classes first, then `sm:`, `md:`, `lg:`, `xl:` groups in order
- Prefer arbitrary values in `[]` for sizes, spacing and colors: `p-[24px]`, `gap-[12px]`, `text-[#71717a]`, `max-w-[1120px]`
- Exceptions where standard utilities are clearer: `flex`, `grid`, `items-center`, `font-bold`, `rounded-full`, `w-full`, `hidden`
- For conditional classes use `cn()` from `lib/utils`, keeping the same ` | ` grouping inside each string

## Code style

- Split UI into small components. One component per file, PascalCase names, colocated in `components/<area>/` (e.g. `components/quiz/QuestionCard.tsx`). Page files stay thin and compose components
- Server components by default; add `"use client"` only where interactivity requires it
- Props typed with a `type` above the component
- Comments only where the code is not clear without them, written with `//`. No JSDoc, no comments that restate the code
- Accessible markup: real buttons and labels, visible focus states, alt text

## Pages

- `/` — home: drop/browse a document (Markdown/TXT/PDF), paste a docs URL (disabled, "Soon"), then choose Discuss or Quiz
- `/discuss/[id]` — chat with the agent about the document; streamed answers, visible tool activity ("Reading section: …"), inline quiz cards when the agent starts a quiz
- `/quiz/[id]` — quiz: one question at a time or a list, progress, results with explanations
- `/discuss` — list of discussions
- `/quiz` — list of quizzes with scores
- Sidebar: links to Discuss/Quizzes and recent sessions

Every page needs empty, loading (skeleton) and error states.
