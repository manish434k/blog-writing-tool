<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a monorepo for a web-based blog writing tool. The frontend is a React+Vite+TypeScript app (client), and the backend is a Node.js+Express+TypeScript app (server).

- Use TipTap for the rich text editor and provide a Medium-like writing experience.
- Implement REST APIs for file import/export (.txt, .docx, .pdf), social/blogging platform integrations, and OAuth.
- Use `mammoth` for .docx import, `pdfjs-dist` for .pdf import, `docx` for .docx export, and `puppeteer` for .pdf export in the backend.
- Prioritize modularity, maintainability, and clear separation of frontend/backend concerns.
- Document all major development progress and issues in the README.

If you encounter TypeScript errors for missing module declarations, check that all libraries are up to date and use maintained packages with type support.
