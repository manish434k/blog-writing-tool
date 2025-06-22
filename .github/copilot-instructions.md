<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This monorepo is for a modern web-based blog writing tool.

**Frontend:**
- React + Vite + TypeScript (in `/client`)
- Uses TipTap for a Medium-like rich text editing experience
- Features: formatting toolbar, undo/redo, file import/export (.txt, .docx, .pdf, .html), import from URL, and integration with backend APIs

**Backend:**
- Node.js + Express + TypeScript (in `/server`)
- REST APIs for saving/loading posts, file import/export (.txt, .docx, .pdf), import from URL (proxied to avoid CORS), and future social/blogging platform integrations (OAuth)
- Uses `mammoth` for .docx import, `pdfjs-dist` for .pdf import, `docx` for .docx export, and `puppeteer` for .pdf export
- Proxies URL imports with a browser-like User-Agent for compatibility
- In-memory post storage (can be replaced with a database in the future)
- All major API activity is logged

**Best Practices:**
- Prioritize modularity, maintainability, and clear separation of frontend/backend concerns
- Document all major development progress and issues in the README
- Keep all libraries up to date and use maintained packages with type support

**Troubleshooting:**
- If you encounter TypeScript errors for missing module declarations, ensure you are using maintained libraries with type support and that your `tsconfig.json` includes all necessary type roots
- For CORS issues, ensure the backend uses the `cors` middleware and proxies external requests as needed

_Last updated: June 22, 2025_
