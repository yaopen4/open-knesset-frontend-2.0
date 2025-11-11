# Open Knesset Frontend

A modern Next.js frontend application for the Open Knesset platform, making Israeli parliamentary data accessible and user-friendly.


## Project Overview

This project is a comprehensive revamp of the Open Knesset platform (https://oknesset.org/), designed to make Israeli parliamentary data more accessible, clear, and user-friendly for citizens, journalists, developers, researchers, and policymakers.


## Tech Stack

- **Framework**: Next.js 15.3.3 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives with shadcn/ui
- **Charts**: Recharts
- **Form Handling**: React Hook Form with Zod validation
- **Theme**: next-themes for dark/light mode support


## Project Structure

```
src/
├── app/                    # Next.js App Router pages and routes
│   ├── bills/             # Bills/proposals pages
│   ├── committees/        # Committee pages
│   ├── dashboard/         # Dashboard page
│   ├── knesset-data/      # Knesset data pages and JSON data
│   ├── members/           # Members of Knesset pages
│   └── ...                # Other route pages
├── components/             # React components
│   ├── dashboard/         # Dashboard-specific components
│   ├── knesset-data/      # Knesset data display components
│   ├── layout/            # Layout components (header, sidebar, breadcrumbs)
│   ├── members/           # Member-related components
│   └── ui/                # Reusable UI components (shadcn/ui)
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and helpers
└── app/                   # Root layout and global styles
```


## Design System

The project follows the gov.il design language:

- **Primary Color**: #0F4C94 (Deep Blue)
- **Light Blue**: #1976D2 (Hover states)
- **Background**: #F5F5F5 (Light Grey)
- **Typography**: PT Sans (Hebrew-friendly sans-serif)
- **Layout**: RTL (Right-to-Left) for Hebrew content


## Documentation

- `docs/PRD.md` - Product Requirements Document
- `docs/DESIGN.md` - Design specifications and visual identity
- `docs/PAGES AND FEATURES.md` - Site map and feature list
