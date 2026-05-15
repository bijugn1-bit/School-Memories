# SchoolMemories Setup Guide

## Quick Start (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Supabase Project
- Go to https://supabase.com
- Sign up (free)
- Create new project
- Wait for project to initialize

### 3. Get API Keys
- Go to Project Settings → API
- Copy `Project URL`
- Copy `anon public` key

### 4. Create Environment File
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 5. Set Up Database
- In Supabase Dashboard, go to SQL Editor
- Create new query
- Copy content from `DATABASE_SETUP.sql`
- Run the query

### 6. Create Storage Bucket
- Go to Supabase Dashboard → Storage
- Create new bucket named `photos`
- Make it PUBLIC

### 7. Run Development Server
```bash
npm run dev
```

Open http://localhost:3000

## Features

✅ User Authentication (Sign up/Login)
✅ Create School Groups/Batches
✅ Create Albums within Groups
✅ Upload Photos
✅ Dashboard with Statistics
✅ Responsive Design
✅ Protected Routes

## Project Structure

```
app/
├── (dashboard)/          # Protected dashboard pages
├── api/                  # API routes
├── login/
├── signup/
├── page.tsx              # Home page
└── layout.tsx

components/
├── auth/                 # Auth forms
├── layout/               # Navigation components
└── ui/                   # Reusable UI components

lib/
├── auth.ts               # Auth utilities
├── supabase.ts           # Supabase client
└── utils.ts              # Helper functions
```

## Key Files

- `package.json` - Dependencies
- `DATABASE_SETUP.sql` - Database schema
- `.env.example` - Environment template
- `app/globals.css` - Global styles (Tailwind)

## Deployment

Deploy to Vercel:
```bash
npm run build
```

## Support

For issues, check:
- Supabase documentation: https://supabase.com/docs
- Next.js documentation: https://nextjs.org/docs
- GitHub Issues
