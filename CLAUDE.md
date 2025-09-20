# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UIGen is an AI-powered React component generator with live preview. It allows users to describe React components they want to create and generates them using Claude AI, with real-time preview capabilities through a virtual file system.

## Development Commands

### Setup
```bash
npm run setup
```
This installs dependencies, generates Prisma client, and runs database migrations.

### Development
```bash
npm run dev          # Start development server with Turbopack
npm run dev:daemon   # Start dev server in background, logs to logs.txt
```

### Build and Deploy
```bash
npm run build        # Build production version
npm run start        # Start production server
```

### Code Quality
```bash
npm run lint         # Run ESLint
npm run test         # Run Vitest tests
```

### Database
```bash
npm run db:reset     # Reset database (force)
```

## Architecture

### Core Technologies
- **Next.js 15** with App Router and Turbopack
- **React 19**
- **TypeScript** with strict configuration
- **Tailwind CSS v4**
- **Prisma** with SQLite database
- **Anthropic Claude AI** via AI SDK
- **Vitest** for testing

### Key Architectural Components

#### Virtual File System (`src/lib/file-system.ts`)
- Implements a complete virtual file system in memory
- No files are written to disk during component generation
- Supports standard file operations: create, read, update, delete, rename
- Used for real-time preview without filesystem I/O
- Files are serialized/deserialized for persistence

#### AI Integration (`src/app/api/chat/route.ts`)
- Stream-based text generation using Vercel AI SDK
- Custom tools for file management and string replacement
- Supports both authenticated and anonymous usage
- Falls back to static code when no API key is provided
- Max 40 steps for full AI, 4 steps for mock responses

#### Database Schema (Prisma)
- **User**: Authentication with email/password (bcrypt)
- **Project**: Stores chat messages and virtual file system state
- Projects linked to users with cascade deletion
- Anonymous projects (userId: null) supported

#### Component Structure
- `src/app/` - Next.js App Router pages and API routes
- `src/components/` - Reusable UI components
- `src/lib/` - Core utilities and business logic
- `src/actions/` - Server actions for database operations
- `src/hooks/` - Custom React hooks

### Key Features
- Real-time component preview using virtual file system
- AI-powered component generation with iterative refinement
- User authentication with anonymous mode
- Project persistence for registered users
- Code export functionality
- Hot reload during development

### Testing Strategy
- Vitest configured with jsdom environment
- React Testing Library for component tests
- Tests located in `src/lib/__tests__/`

### Configuration Notes
- TypeScript with strict mode and Next.js plugin
- ESLint with Next.js configuration
- Tailwind CSS v4 with typography plugin
- PostCSS configuration for Tailwind
- Path aliases: `@/*` maps to `src/*`

### Code Style Guidelines
- Use comments sparingly - only comment complex code that isn't self-explanatory
 
- The database schema is defined in the @prisma/schema.prisma file. Reference it any time you need to understand the structure of data stored in the database