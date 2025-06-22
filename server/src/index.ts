import express from 'express';
import multer from 'multer';
import mammoth from 'mammoth';
import pdfParse from 'pdf-parse';
import fs from 'fs';
import path from 'path';
import htmlDocx from 'html-docx-js';
import puppeteer from 'puppeteer';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Middleware for logging all requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// In-memory post storage
const posts: { [key: string]: { id: string; content: string } } = {};

// Save a post
app.post('/api/posts', (req, res) => {
  const { id, content } = req.body;
  console.log(`[${new Date().toISOString()}] Saving post: ${id}`);
  if (!id || !content) {
    console.log(`[${new Date().toISOString()}] Save failed: Missing id or content`);
    return res.status(400).json({ error: 'Missing id or content' });
  }
  posts[id] = { id, content };
  console.log(`[${new Date().toISOString()}] Post saved: ${id}`);
  res.json({ message: 'Post saved', post: posts[id] });
});

// Load a post
app.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  console.log(`[${new Date().toISOString()}] Loading post: ${id}`);
  const post = posts[id];
  if (!post) {
    console.log(`[${new Date().toISOString()}] Load failed: Post not found: ${id}`);
    return res.status(404).json({ error: 'Post not found' });
  }
  console.log(`[${new Date().toISOString()}] Post loaded: ${id}`);
  res.json(post);
});

// File upload setup
const upload = multer({ dest: 'uploads/' });

// Import .docx
app.post('/api/import/docx', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  try {
    const result = await mammoth.convertToHtml({ path: req.file.path });
    fs.unlinkSync(req.file.path); // Clean up
    res.json({ content: result.value });
  } catch (err) {
    res.status(500).json({ error: 'Failed to parse .docx' });
  }
});

// Import .pdf
app.post('/api/import/pdf', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  try {
    const dataBuffer = fs.readFileSync(req.file.path);
    const data = await pdfParse(dataBuffer);
    fs.unlinkSync(req.file.path); // Clean up
    res.json({ content: data.text });
  } catch (err) {
    res.status(500).json({ error: 'Failed to parse .pdf' });
  }
});

// Export as .docx
app.post('/api/export/docx', express.json({ limit: '2mb' }), async (req, res) => {
  const { html } = req.body;
  if (!html) return res.status(400).json({ error: 'No HTML provided' });
  const docxBuffer = htmlDocx.asBlob(html);
  res.setHeader('Content-Disposition', 'attachment; filename=post.docx');
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  res.send(docxBuffer);
});

// Export as .pdf
app.post('/api/export/pdf', express.json({ limit: '2mb' }), async (req, res) => {
  const { html } = req.body;
  if (!html) return res.status(400).json({ error: 'No HTML provided' });
  try {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();
    res.setHeader('Content-Disposition', 'attachment; filename=post.pdf');
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

app.get('/', (req, res) => {
  res.send('Blog Writing Tool Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
