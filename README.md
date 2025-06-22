# Blog Writing Tool

This project is a web-based blog writing tool with a React (Vite, TypeScript) frontend and a Node.js (Express, TypeScript) backend. It is designed for:
- Medium-compatible writing pad (TipTap editor)
- Import/export of posts and files (.txt, .docx, .pdf, etc.)
- Social media and blogging platform integrations (OAuth)
- Undo/redo (history) support

## Structure
- `/client` - Frontend (React, Vite, TypeScript)
- `/server` - Backend (Node.js, Express, TypeScript)

## Getting Started

### Frontend
```sh
npm install
npm run dev
```

### Backend
```sh
cd server
npm install
npx ts-node-dev src/index.ts
```

---

## Features (Planned)
- Medium-like writing experience
- Import from URL, .txt, .docx, .pdf
- Export/download/print
- Social/blogging platform connect & publish
- Undo/redo (history)

---

# Development Progress (as of June 22, 2025)

## Project Setup
- Monorepo with React (Vite, TypeScript) frontend and Node.js (Express, TypeScript) backend.
- Version control initialized and project structure established.

## Frontend
- TipTap rich text editor integrated as the main writing pad.
- Custom toolbar for formatting (bold, italic, headings, lists, undo/redo).
- Save/Load post functionality connected to backend API.
- File import: Supports .txt (client-side), .docx, .pdf (via backend).
- File export: Supports .txt, .html (client-side), .docx, .pdf (via backend).
- UI improved for file actions and toolbar.

## Backend
- Express server with TypeScript, using in-memory storage for posts.
- REST API endpoints for saving/loading posts.
- File import endpoints for .docx (mammoth) and .pdf (now using pdfjs-dist instead of pdf-parse).
- File export endpoints for .docx (now using docx instead of html-docx-js) and .pdf (puppeteer).
- Continuous logging of all API activity.
- Removed custom type declarations for pdf-parse and html-docx-js; switched to maintained libraries with built-in types.

## Recent Changes
- Removed dependency on `pdf-parse` and `html-docx-js` due to install/type issues.
- Switched PDF import to `pdfjs-dist` and DOCX export to `docx`.
- Updated backend endpoints and documentation accordingly.

---

See `.github/copilot-instructions.md` for workspace-specific Copilot instructions.

_Last updated: June 22, 2025_
