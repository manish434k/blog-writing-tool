import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import './App.css';
import axios from 'axios';
import { useCallback, useRef, useState } from 'react';
import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import muiTheme from './muiTheme';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import debounce from 'lodash.debounce';
import Header from './components/Header';
import MenuBar from './components/MenuBar';
import SideBar from './components/SideBar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// --- COMPONENTS ---

function App() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<h1>Start writing your blog post here...</h1>', // Set initial content as H1
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importUrl, setImportUrl] = useState('');
  const [importing, setImporting] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Add a toggle for desktop sidebar
  const [desktopSidebarMode, setDesktopSidebarMode] = useState<'permanent' | 'temporary'>('permanent');

  // Debounced URL setter
  const debouncedSetImportUrl = React.useMemo(() => debounce(setImportUrl, 300), []);

  // Save post to backend
  const savePost = useCallback(async () => {
    if (!editor) return;
    const content = editor.getHTML();
    const id = 'demo-post';
    try {
      await axios.post('http://localhost:4000/api/posts', { id, content });
      // showSnackbar('Post saved!', 'success');
    } catch (err) {
      // showSnackbar('Failed to save post', 'error');
    }
  }, [editor]);

  // Load post from backend
  const loadPost = useCallback(async () => {
    const id = 'demo-post';
    try {
      const res = await axios.get(`http://localhost:4000/api/posts/${id}`);
      if (editor) editor.commands.setContent(res.data.content);
      // showSnackbar('Post loaded!', 'success');
    } catch (err) {
      // showSnackbar('Failed to load post', 'error');
    }
  }, [editor]);

  // Import file handler
  const handleFileImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext === 'txt') {
      const text = await file.text();
      editor.commands.setContent(`<pre>${text}</pre>`);
      // showSnackbar('Text file imported!', 'success');
    } else if (ext === 'docx' || ext === 'pdf') {
      const formData = new FormData();
      formData.append('file', file);
      const url = ext === 'docx'
        ? 'http://localhost:4000/api/import/docx'
        : 'http://localhost:4000/api/import/pdf';
      try {
        const res = await axios.post(url, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        editor.commands.setContent(res.data.content);
        // showSnackbar(`${ext.toUpperCase()} file imported!`, 'success');
      } catch (err) {
        // showSnackbar('Failed to import file', 'error');
      }
    } else {
      // showSnackbar('Unsupported file type', 'warning');
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Import from URL handler
  const importFromUrl = async () => {
    if (!importUrl || !editor) return;
    setImporting(true);
    try {
      const res = await axios.post('http://localhost:4000/api/import/url', { url: importUrl });
      let content = '';
      if (typeof res.data.content === 'string' && res.data.content.trim().startsWith('<')) {
        content = res.data.content;
      } else if (typeof res.data.content === 'string') {
        content = `<pre>${res.data.content}</pre>`;
      } else {
        content = JSON.stringify(res.data.content);
      }
      editor.commands.setContent(content);
      // showSnackbar('Imported from URL!', 'success');
    } catch (err: any) {
      let msg = 'Failed to import from URL';
      if (err.response && err.response.data && err.response.data.error) {
        msg += `: ${err.response.data.error}`;
      } else if (err.message) {
        msg += `: ${err.message}`;
      }
      // showSnackbar(msg, 'error');
    } finally {
      setImporting(false);
    }
  };

  // Export as .txt
  const exportAsTxt = () => {
    if (!editor) return;
    const text = editor.getText();
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'post.txt';
    a.click();
    URL.revokeObjectURL(url);
    // showSnackbar('Exported as .txt!', 'success');
  };

  // Export as .html
  const exportAsHtml = () => {
    if (!editor) return;
    const html = editor.getHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'post.html';
    a.click();
    URL.revokeObjectURL(url);
    // showSnackbar('Exported as .html!', 'success');
  };

  // Export as .docx
  const exportAsDocx = async () => {
    if (!editor) return;
    const html = editor.getHTML();
    try {
      const res = await axios.post('http://localhost:4000/api/export/docx', { html }, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = 'post.docx';
      a.click();
      window.URL.revokeObjectURL(url);
      // showSnackbar('Exported as .docx!', 'success');
    } catch (err) {
      // showSnackbar('Failed to export as .docx', 'error');
    }
  };

  // Export as .pdf
  const exportAsPdf = async () => {
    if (!editor) return;
    const html = editor.getHTML();
    try {
      const res = await axios.post('http://localhost:4000/api/export/pdf', { html }, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = 'post.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
      // showSnackbar('Exported as .pdf!', 'success');
    } catch (err) {
      // showSnackbar('Failed to export as .pdf', 'error');
    }
  };

  // Handler for sidebar toggle
  const handleMenuClick = () => {
    if (isMobile) setSidebarOpen(true);
    else setDesktopSidebarMode(m => (m === 'permanent' ? 'temporary' : 'permanent'));
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div className="App">
        <Box sx={{ position: 'sticky', top: 0, zIndex: 1201, width: '100%' }}>
          <Header onMenuClick={handleMenuClick} />
        </Box>
        <Box sx={{ position: 'relative', zIndex: 1200 }}>
          <SideBar
            onSave={savePost}
            onLoad={loadPost}
            onImportFile={handleFileImport}
            onExportTxt={exportAsTxt}
            onExportHtml={exportAsHtml}
            onExportDocx={exportAsDocx}
            onExportPdf={exportAsPdf}
            onImportUrl={importFromUrl}
            importUrl={importUrl}
            setImportUrl={debouncedSetImportUrl}
            importing={importing}
            fileInputRef={fileInputRef}
            variant={isMobile ? 'temporary' : desktopSidebarMode}
            open={isMobile ? sidebarOpen : desktopSidebarMode === 'permanent' ? true : sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        </Box>
        <div className="AppMain">
          <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
            <div className="AppContent" style={{ display: 'flex', justifyContent: 'center' }}>
              <MenuBar editor={editor} />
              <EditorContent
                editor={editor}
                className="EditorContent"
                tabIndex={0}
                aria-label="Blog post editor area"
                role="region"
                style={{ outline: 'none', width: '90vw', minWidth: 320, maxWidth: 1400, margin: '0 auto' }}
              />
            </div>
          </Container>
        </div>
        <footer className="AppFooter" style={{ background: muiTheme.palette.background.default, borderTop: '1px solid ' + muiTheme.palette.divider }}>
          <Container maxWidth="md" sx={{ py: 2, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
            <Typography variant="body2" color="text.secondary" align="center">
              © {new Date().getFullYear()} Bloggy. All rights reserved.
            </Typography>
            <nav aria-label="Footer navigation">
              <Button href="#about" color="primary" size="small" sx={{ textTransform: 'none', mx: 0.5 }}>About</Button>
              <Button href="#privacy" color="primary" size="small" sx={{ textTransform: 'none', mx: 0.5 }}>Privacy</Button>
              <Button href="#contact" color="primary" size="small" sx={{ textTransform: 'none', mx: 0.5 }}>Contact</Button>
            </nav>
          </Container>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
