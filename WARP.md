# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

---

## 🚀 Quick Start Commands

### Development
```bash
# Start development server with Turbopack
npm run dev

# Build for production (includes Prisma generation)
npm run build

# Start production server
npm start

# Lint the codebase
npm run lint
```

### Database
```bash
# Generate Prisma client (runs automatically on install)
npx prisma generate

# Create and apply migration (NEVER use db push)
npx prisma migrate dev

# Deploy migrations to production
npx prisma migrate deploy

# Open Prisma Studio to view database
npx prisma studio
```

### Storybook
```bash
# Run Storybook development server
npm run storybook

# Build Storybook for production
npm run build-storybook
```

---

## 🏗️ Architecture Overview

### **CaptureGem Dashboard**
A Next.js 15 dashboard for managing performer relationship data with advanced analytics, filtering, and enriched profile information.

### Core Stack
- **Next.js 15** with App Router (React 19)
- **TypeScript** (strict mode)
- **Prisma** for database ORM
- **tRPC** for type-safe APIs
- **NextAuth.js** for authentication
- **Tailwind CSS** for styling (NO Radix UI/shadcn for common UI)
- **Inngest** for background jobs
- **React Query** for data fetching
- **Recharts** for data visualization

### Critical Design Decisions

**1. No Radix UI or shadcn for Common Components**
- Use Tailwind CSS directly for textarea, button, input, etc.
- Radix/shadcn only for complex components like modals or popovers
- Keep components lightweight and customizable

**2. Prisma Migration Strategy**
- ALWAYS use `npx prisma migrate dev` for schema changes
- NEVER use `npx prisma db push` - it risks data loss
- No forced migrations or database resets without explicit approval

**3. Master Source of Truth**
- `/api/FRONTEND_SPEC.md` - Complete data structures and component specs
- `/api/IMPLEMENTATION_GUIDE.md` - Backend implementation guide
- All types in `src/lib/types/capturegem.ts` must match FRONTEND_SPEC

---

## 📁 Project Structure

### Key Directories

```
dashboard-next/
├── app/                          # Next.js App Router
│   ├── dashboard/                # Main dashboard page
│   ├── auth/                     # Authentication pages
│   └── api/                      # API routes (tRPC, NextAuth, Inngest)
│
├── src/
│   ├── components/               # React components (PascalCase)
│   │   ├── models/               # Model-specific components
│   │   ├── dashboard/            # Dashboard components
│   │   ├── filters/              # Filter/search components
│   │   └── ui/                   # Base UI components
│   │
│   ├── lib/
│   │   ├── api/
│   │   │   ├── capturegem-client.ts    # API client for backend
│   │   │   ├── root.ts                 # tRPC root router
│   │   │   └── trpc.ts                 # tRPC config
│   │   ├── types/
│   │   │   └── capturegem.ts           # FRONTEND_SPEC types
│   │   ├── utils/
│   │   │   ├── filter-utils.ts         # Filter logic
│   │   │   └── format-utils.ts         # Formatting helpers
│   │   ├── auth/                       # NextAuth configuration
│   │   ├── trpc/                       # tRPC client/server
│   │   ├── db.ts                       # Prisma client
│   │   └── aiClient.ts                 # AI API wrapper
│   │
│   ├── hooks/                    # Custom React hooks
│   └── stories/                  # Storybook stories
│
├── prisma/
│   └── schema.prisma             # Database schema
│
├── agent-helpers/                # AI agent resources
│   ├── README.md                 # Agent instructions
│   ├── tasks.md                  # Task checklist
│   └── logs/                     # Agent logs (gitignored)
│
└── types/                        # v0 types (being consolidated)
```

---

## 🔄 Data Flow Architecture

### API Integration Pattern

The dashboard integrates with a backend API that follows this structure:

```
Backend API (../api/) 
    ↓
CaptureGem Client (src/lib/api/capturegem-client.ts)
    ↓
React Query Hooks (src/hooks/use-*.ts)
    ↓
React Components (src/components/)
```

### Key Data Sources
1. **Backend API** (`/api/models`, `/api/dashboard`, `/api/analytics`)
2. **Prisma Database** (via tRPC for auth/user data)
3. **Inngest Events** (background jobs, poll for updates)

### Type Safety Chain
```
FRONTEND_SPEC.md 
  → src/lib/types/capturegem.ts 
    → API client functions
      → React Query hooks
        → Component props
```

---

## 🎨 Component Guidelines

### File Organization
- Components in `src/components/` using PascalCase
- Keep files ≤500 lines for AI readability
- One component per file matching filename
- Update top-of-file docs after edits

### Component Patterns
```typescript
// Good: Functional component with "use client" if needed
"use client";

import { type FC } from 'react';

interface ModelCardProps {
  username: string;
  ratings: Ratings;
}

export const ModelCard: FC<ModelCardProps> = ({ username, ratings }) => {
  // Component logic
};
```

### Styling
- Tailwind CSS only (mobile-first, dark mode with `dark:` prefix)
- Extend theme in `tailwind.config.ts`
- Framer Motion for animations
- Icons from `lucide-react` (PascalCase)

### Notifications
- Use `react-toastify` in client components
- `toast.success()`, `toast.error()`, `toast.info()`

---

## 🔌 Backend Integration

### tRPC Routers
- Routers in `src/lib/api/routers/`
- Compose in `src/lib/api/root.ts`
- Use `publicProcedure` or `protectedProcedure` with Zod validation
- Access from React via `@/lib/trpc/react`

### Inngest Background Jobs
- Config in `inngest.config.ts`
- API route in `src/app/api/inngest/route.ts`
- **Important**: Update UI via polling when events complete, NOT via tRPC success response

### Database (Prisma)
- Schema in `prisma/schema.prisma`
- Client in `src/lib/db.ts`
- Tables: `snake_case`, Fields: `camelCase`
- NO raw SQL queries
- Migration workflow:
  1. Edit `schema.prisma`
  2. Run `npx prisma migrate dev --name descriptive_name`
  3. Review migration file
  4. Commit both schema and migration

---

## 🤖 AI Integration

### AI Calls
- All AI calls go through `generateChatCompletion` in `src/lib/aiClient.ts`
- Default to `GPT-5` model
- Support for multiple providers (OpenAI, Anthropic, Groq, Perplexity)

### Agent Helpers
- Instructions in `agent-helpers/README.md`
- Task checklist in `agent-helpers/tasks.md`
- Store reusable tools and context in `agent-helpers/`

---

## 📚 Storybook

### Story Organization
- Stories in `src/stories/` with `.stories.tsx` extension
- One story per component, matching component name
- Use autodocs for automatic documentation
- Include multiple variants and sizes
- Test interactive features with actions
- Use relative imports from component directory

Example:
```typescript
// src/stories/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
};

export default meta;
```

---

## 🧪 Testing & Quality

### Build Validation
**CRITICAL**: After all changes, ALWAYS run:
```bash
npm run build
```
- Ignore warnings
- Fix all errors before committing

### TypeScript
- Strict mode enabled
- No `any` types
- Use optional chaining and union types (no enums)
- Shared types in `src/lib/types.ts`

### Code Organization
- Reusable logic in `src/lib/utils/shared.ts` (client) or `src/lib/utils/server.ts` (server)
- Sort imports: external → internal → sibling → styles
- Semantic commits only
- Use `tsx` scripts for migrations

---

## 🔐 Environment Variables

Required in `.env`:
```env
# Database (Supabase or other Postgres)
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"

# CaptureGem API Integration
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
CAPTUREGEM_DATA_DIR="/path/to/data"
CAPTUREGEM_PROJECT_DIR="/path/to/project"

# Optional: AI Providers
OPENAI_API_KEY="sk-..."
ANTHROPIC_API_KEY="sk-ant-..."
GROQ_API_KEY="gsk_..."
PERPLEXITY_API_KEY="pplx-..."

# Optional: Other Services
RESEND_API_KEY="re_..."
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
INNGEST_EVENT_KEY="..."
```

---

## 📖 Development Workflow

### Starting a New Task
1. Review `agent-helpers/tasks.md` for current priorities
2. Check FRONTEND_SPEC.md for requirements
3. Update types in `src/lib/types/capturegem.ts` if needed
4. Implement component/feature
5. Test with `npm run dev`
6. Build with `npm run build`
7. Update documentation
8. Commit with semantic message

### Common Patterns

**Fetching Data**
```typescript
import { api } from '@/lib/trpc/react';

const { data, isLoading } = api.models.getAll.useQuery({
  limit: 50,
  sort: 'rating'
});
```

**Using CaptureGem API Client**
```typescript
import { captureGemClient } from '@/lib/api/capturegem-client';

const models = await captureGemClient.fetchModels({
  limit: 50,
  sort: 'rating',
  order: 'desc'
});
```

**Filtering Models**
```typescript
import { applyFilters } from '@/lib/utils/filter-utils';

const filtered = applyFilters(models, filterState);
```

---

## 🎯 Project-Specific Context

### Rating System
Models are rated on an 8-tier scale: `S++`, `S+`, `S`, `A+`, `A`, `B`, `C`, `D`
- Overall rating is weighted calculation of 6 categories
- Categories: face, body, ass, boobs, vibe, production
- Parse from shorthand: `[O:S+] [F:S] [B:A]`
- Utilities in `src/lib/rating-utils.ts`

### Tag System
- Tags are UPPERCASE: `YOUNG`, `ASS`, `PREMIUM`, `PROSPECT`
- Categorized into: appearance, bodyParts, personality, value, special
- Tag bank managed in backend
- Filter models by tags in dashboard

### Pricing Format
- PVT: `"44/10"` = 44 tokens/min, 10 min minimum
- TOY: `"2/1low"` or `"1tk/5sec"`
- Value tiers: budget, standard, premium, luxury

### Data Enrichment
- Scraped profiles from Stripchat
- Includes tip menus, reviews, demographics
- Stored in `enrichedProfile` field
- May not be available for all models

---

## 🚫 Common Pitfalls

### DON'T
- ❌ Use `npx prisma db push` for schema changes
- ❌ Use Radix UI or shadcn for basic UI components
- ❌ Use `any` type in TypeScript
- ❌ Skip `npm run build` before committing
- ❌ Update UI immediately on Inngest event trigger (use polling)
- ❌ Write files >500 lines without splitting
- ❌ Use enums (use union types instead)

### DO
- ✅ Use `npx prisma migrate dev` for schema changes
- ✅ Use Tailwind CSS for common components
- ✅ Keep types aligned with FRONTEND_SPEC.md
- ✅ Run build validation before every commit
- ✅ Poll for Inngest job completion
- ✅ Keep files small and focused
- ✅ Use union types: `type Status = 'active' | 'inactive'`

---

## 📚 Key Documentation Files

- **FRONTEND_SPEC.md** (`../api/`) - Master data structure reference
- **IMPLEMENTATION_GUIDE.md** (`../api/`) - Backend API guide
- **README.md** - Template documentation from next-ai-starter
- **AGENTS.md** - Agent-specific guidelines
- **.cursorrules** - Cursor IDE rules
- **PRE_PHASE_1_SETUP.md** - Initial setup documentation
- **SETUP_COMPLETE.md** - Setup completion status

---

## 🔗 External Dependencies

### Core Framework
- Next.js 15.1.0
- React 19.0.0
- TypeScript 5.x

### Key Libraries
- @tanstack/react-query - Data fetching
- @trpc/client, @trpc/server - Type-safe APIs
- @prisma/client - Database ORM
- next-auth - Authentication
- inngest - Background jobs
- recharts - Charts and graphs
- framer-motion - Animations
- zod - Schema validation
- react-toastify - Notifications

### Development Tools
- Storybook 8.5.3
- Tailwind CSS 3.4.1
- TypeScript (strict mode)

---

## 💡 Tips for AI Agents

1. **Always check FRONTEND_SPEC.md** before modifying types
2. **Test build after every change** with `npm run build`
3. **Keep components small** (≤500 LOC) for better AI navigation
4. **Update top-of-file docs** after making changes
5. **Use existing utilities** before creating new ones
6. **Follow the type chain** from FRONTEND_SPEC → types → components
7. **Prioritize Phase 1 tasks** in `agent-helpers/tasks.md`
8. **Check for v0 component duplication** - consolidate to single source

---

## 🎓 Learning Resources

- Next.js App Router: https://nextjs.org/docs
- Prisma: https://www.prisma.io/docs
- tRPC: https://trpc.io/docs
- Tailwind CSS: https://tailwindcss.com/docs
- React Query: https://tanstack.com/query/latest
- Inngest: https://www.inngest.com/docs

---

*This WARP.md is maintained as the single source of truth for development guidelines in this repository.*
