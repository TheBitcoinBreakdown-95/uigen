# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run setup      # Install deps, generate Prisma client, run migrations
npm run dev        # Start dev server with Turbopack (localhost:3000)
npm run build      # Production build
npm run lint       # ESLint
npm run test       # Run Vitest tests
npm run db:reset   # Reset database (drops all data)
```

Single test file: `npx vitest run src/lib/__tests__/file-system.test.ts`

## Architecture

UIGen is an AI-powered React component generator with live preview. Users describe components in chat, Claude generates code, and a live preview renders immediately.

### Core Data Flow

1. **Chat API** (`src/app/api/chat/route.ts`) - Receives messages + virtual file system state, streams AI responses using Vercel AI SDK with two tools:
   - `str_replace_editor` - Create/edit files (view, create, str_replace, insert commands)
   - `file_manager` - Rename/delete files

2. **Virtual File System** (`src/lib/file-system.ts`) - In-memory file system that stores all generated React components. Never writes to disk. Serialized to/from JSON for API transport and database persistence.

3. **Preview Rendering** (`src/components/preview/PreviewFrame.tsx` + `src/lib/transform/jsx-transformer.ts`) - Transforms JSX/TSX using Babel in-browser, creates blob URLs, builds an import map, and renders in a sandboxed iframe with Tailwind CDN.

### Context Providers

- `FileSystemProvider` - Wraps VirtualFileSystem, provides file operations, handles tool calls from AI
- `ChatProvider` - Wraps Vercel AI SDK's useChat, connects to `/api/chat`, forwards tool calls to FileSystemProvider

### AI Provider

`src/lib/provider.ts` - Returns Claude Haiku 4.5 if `ANTHROPIC_API_KEY` is set, otherwise returns a MockLanguageModel that generates static demo components.

### Authentication

JWT-based auth using `jose`. Sessions stored in httpOnly cookies. Users can work anonymously (no persistence) or sign up to save projects.

### Database

SQLite via Prisma. Schema in `prisma/schema.prisma`. Prisma client outputs to `src/generated/prisma`. Models: User, Project (stores serialized messages and file system data).

**Always reference `prisma/schema.prisma` to understand the database structure.**

### File Import Conventions

Generated components use `@/` alias for imports (e.g., `import Button from '@/components/Button'`). The preview transformer handles this by mapping to blob URLs.

## Code Style

- Use comments sparingly. Only comment complex code.
