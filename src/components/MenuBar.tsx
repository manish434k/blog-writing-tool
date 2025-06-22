import React from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatStrikethroughIcon from '@mui/icons-material/FormatStrikethrough';
import FormatParagraphIcon from '@mui/icons-material/FormatAlignLeft';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';

export interface MenuBarProps {
  editor: any;
}

const MenuBar: React.FC<MenuBarProps> = React.memo(function MenuBarMemo({ editor }) {
  if (!editor) return null;
  return (
    <>
      <div className="menu-bar" style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
        {/* Text styles */}
        <Tooltip title={<span>Bold <span style={{fontSize:12,opacity:0.7}}>(Ctrl+B)</span></span>} arrow>
          <Button
            onClick={() => editor.chain().focus().toggleBold().run()}
            color={editor.isActive('bold') ? 'primary' : 'inherit'}
            variant={editor.isActive('bold') ? 'contained' : 'outlined'}
            size="small"
            aria-label="Bold (Ctrl+B)"
          >
            <FormatBoldIcon />
          </Button>
        </Tooltip>
        <Tooltip title={<span>Italic <span style={{fontSize:12,opacity:0.7}}>(Ctrl+I)</span></span>} arrow>
          <Button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            color={editor.isActive('italic') ? 'primary' : 'inherit'}
            variant={editor.isActive('italic') ? 'contained' : 'outlined'}
            size="small"
            aria-label="Italic (Ctrl+I)"
          >
            <FormatItalicIcon />
          </Button>
        </Tooltip>
        <Tooltip title={<span>Strike <span style={{fontSize:12,opacity:0.7}}>(Ctrl+Shift+X)</span></span>} arrow>
          <Button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            color={editor.isActive('strike') ? 'primary' : 'inherit'}
            variant={editor.isActive('strike') ? 'contained' : 'outlined'}
            size="small"
            aria-label="Strikethrough (Ctrl+Shift+X)"
          >
            <FormatStrikethroughIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Paragraph" arrow>
          <Button
            onClick={() => editor.chain().focus().setParagraph().run()}
            color={editor.isActive('paragraph') ? 'primary' : 'inherit'}
            variant={editor.isActive('paragraph') ? 'contained' : 'outlined'}
            size="small"
            aria-label="Paragraph"
          >
            <FormatParagraphIcon />
          </Button>
        </Tooltip>
        <Tooltip title={<span>Heading 1 <span style={{fontSize:12,opacity:0.7}}>(Ctrl+Alt+1)</span></span>} arrow>
          <Button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            color={editor.isActive('heading', { level: 1 }) ? 'primary' : 'inherit'}
            variant={editor.isActive('heading', { level: 1 }) ? 'contained' : 'outlined'}
            size="small"
            aria-label="Heading 1 (Ctrl+Alt+1)"
          >
            <LooksOneIcon />
          </Button>
        </Tooltip>
        <Tooltip title={<span>Heading 2 <span style={{fontSize:12,opacity:0.7}}>(Ctrl+Alt+2)</span></span>} arrow>
          <Button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            color={editor.isActive('heading', { level: 2 }) ? 'primary' : 'inherit'}
            variant={editor.isActive('heading', { level: 2 }) ? 'contained' : 'outlined'}
            size="small"
            aria-label="Heading 2 (Ctrl+Alt+2)"
          >
            <LooksTwoIcon />
          </Button>
        </Tooltip>
        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
        {/* Lists */}
        <Tooltip title={<span>Bullet List <span style={{fontSize:12,opacity:0.7}}>(Ctrl+Shift+8)</span></span>} arrow>
          <Button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            color={editor.isActive('bulletList') ? 'primary' : 'inherit'}
            variant={editor.isActive('bulletList') ? 'contained' : 'outlined'}
            size="small"
            aria-label="Bullet List (Ctrl+Shift+8)"
          >
            <FormatListBulletedIcon />
          </Button>
        </Tooltip>
        <Tooltip title={<span>Ordered List <span style={{fontSize:12,opacity:0.7}}>(Ctrl+Shift+7)</span></span>} arrow>
          <Button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            color={editor.isActive('orderedList') ? 'primary' : 'inherit'}
            variant={editor.isActive('orderedList') ? 'contained' : 'outlined'}
            size="small"
            aria-label="Ordered List (Ctrl+Shift+7)"
          >
            <FormatListNumberedIcon />
          </Button>
        </Tooltip>
        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
        {/* Undo/Redo */}
        <Tooltip title={<span>Undo <span style={{fontSize:12,opacity:0.7}}>(Ctrl+Z)</span></span>} arrow>
          <Button
            onClick={() => editor.chain().focus().undo().run()}
            color="inherit"
            variant="outlined"
            size="small"
            aria-label="Undo (Ctrl+Z)"
          >
            <UndoIcon />
          </Button>
        </Tooltip>
        <Tooltip title={<span>Redo <span style={{fontSize:12,opacity:0.7}}>(Ctrl+Y)</span></span>} arrow>
          <Button
            onClick={() => editor.chain().focus().redo().run()}
            color="inherit"
            variant="outlined"
            size="small"
            aria-label="Redo (Ctrl+Y)"
          >
            <RedoIcon />
          </Button>
        </Tooltip>
      </div>
      <Divider sx={{ mb: 2 }} />
    </>
  );
});

export default MenuBar;
