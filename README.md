# Bloggy – Modern Blog Writing Tool

## Overview
Bloggy is a modern, web-based blog writing tool designed for clarity, accessibility, and a delightful writing experience. It features a rich text editor, file import/export, and a professional, branded UI based on the brand guide below.

## Tech Stack
**Frontend:**
- React (with Vite)
- TypeScript
- TipTap (rich text editor)
- Material UI (MUI) for UI components and theming
- @mui/icons-material for iconography
- Axios for HTTP requests

**Backend:**
- Node.js
- Express
- TypeScript
- REST APIs for post management and file import/export
- `mammoth` for .docx import
- `pdfjs-dist` for .pdf import
- `docx` for .docx export
- `puppeteer` for .pdf export

**Other:**
- In-memory post storage (can be replaced with a database)
- CORS proxy for URL imports
- Modular, accessible, and responsive design

## Features
- **Rich Text Editing:** Medium-like experience powered by TipTap and Material UI (MUI)
- **Formatting Toolbar:** Bold, italic, headings, lists, undo/redo, and more
- **Sidebar:** Save/load posts, import/export (.txt, .docx, .pdf, .html), import from URL
- **Notifications:** Branded, accessible, and with icon support
- **Responsive Layout:** Drawer sidebar, AppBar, and footer adapt to all devices
- **Accessibility:** ARIA labels, keyboard navigation, and focus management
- **Branding:** Custom theme, colors, fonts, favicon, and page title

## Development & Structure
- `/client`: Frontend React app (see `src/` for main code)
- `/server`: Backend Express API (not shown here)
- `BRAND_GUIDE.md`: Brand colors, fonts, and UI guidelines
- `src/theme.ts`, `src/muiTheme.ts`: MUI theme setup
- `src/App.tsx`: Main app, layout, and logic
- `src/components/`: Modular UI components (MenuBar, SideBar, SnackbarQueue)

## How to Run
1. Install dependencies: `npm install`
2. Start the frontend: `npm run dev`
3. Start the backend (see `/server` for details)


For full brand details, see `BRAND_GUIDE.md`.
