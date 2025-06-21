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

See `.github/copilot-instructions.md` for workspace-specific Copilot instructions.
