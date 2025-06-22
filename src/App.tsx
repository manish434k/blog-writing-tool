import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import './App.css';
import axios from 'axios';
import { useCallback, useRef } from 'react';

function MenuBar({ editor }: { editor: any }) {
  if (!editor) {
    return null;
  }
  return (
    <div className="menu-bar">
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''}>
        Bold
      </button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active' : ''}>
        Italic
      </button>
      <button onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'is-active' : ''}>
        Strike
      </button>
      <button onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive('paragraph') ? 'is-active' : ''}>
        Paragraph
      </button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}>
        H1
      </button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}>
        H2
      </button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'is-active' : ''}>
        Bullet List
      </button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'is-active' : ''}>
        Ordered List
      </button>
      <button onClick={() => editor.chain().focus().undo().run()}>
        Undo
      </button>
      <button onClick={() => editor.chain().focus().redo().run()}>
        Redo
      </button>
    </div>
  );
}

function App() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<h2>Start writing your blog post here...</h2>',
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Save post to backend
  const savePost = useCallback(async () => {
    if (!editor) return;
    const content = editor.getHTML();
    const id = 'demo-post';
    try {
      await axios.post('http://localhost:4000/api/posts', { id, content });
      alert('Post saved!');
    } catch (err) {
      alert('Failed to save post');
    }
  }, [editor]);

  // Load post from backend
  const loadPost = useCallback(async () => {
    const id = 'demo-post';
    try {
      const res = await axios.get(`http://localhost:4000/api/posts/${id}`);
      if (editor) editor.commands.setContent(res.data.content);
      alert('Post loaded!');
    } catch (err) {
      alert('Failed to load post');
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
      } catch (err) {
        alert('Failed to import file');
      }
    } else {
      alert('Unsupported file type');
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
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
  };

  // Export as .html (for .docx or .pdf conversion, backend can be used in future)
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
    } catch (err) {
      alert('Failed to export as .docx');
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
    } catch (err) {
      alert('Failed to export as .pdf');
    }
  };

  return (
    <div className="App">
      <h1>Blog Writing Tool</h1>
      <MenuBar editor={editor} />
      <div style={{ marginBottom: 16, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={savePost}>Save Post</button>
        <button onClick={loadPost}>Load Post</button>
        <input
          type="file"
          accept=".txt,.docx,.pdf"
          ref={fileInputRef}
          onChange={handleFileImport}
          style={{ marginLeft: 8, marginRight: 8 }}
        />
        <button onClick={exportAsTxt}>Export as .txt</button>
        <button onClick={exportAsHtml}>Export as .html</button>
        <button onClick={exportAsDocx}>Export as .docx</button>
        <button onClick={exportAsPdf}>Export as .pdf</button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

export default App;
