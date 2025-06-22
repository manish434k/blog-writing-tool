import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/CheckCircle';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DescriptionIcon from '@mui/icons-material/Description';
import LanguageIcon from '@mui/icons-material/Language';
import ArticleIcon from '@mui/icons-material/Article';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import LinkIcon from '@mui/icons-material/Link';

export interface SideBarProps {
  onSave: () => void;
  onLoad: () => void;
  onImportFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExportTxt: () => void;
  onExportHtml: () => void;
  onExportDocx: () => void;
  onExportPdf: () => void;
  onImportUrl: () => void;
  importUrl: string;
  setImportUrl: (url: string) => void;
  importing: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  variant?: 'permanent' | 'temporary';
  open?: boolean;
  onClose?: () => void;
}

const SideBar: React.FC<SideBarProps> = React.memo(function SideBarMemo({
  onSave,
  onLoad,
  onImportFile,
  onExportTxt,
  onExportHtml,
  onExportDocx,
  onExportPdf,
  onImportUrl,
  importUrl,
  setImportUrl,
  importing,
  fileInputRef,
  variant = 'permanent',
  open = true,
  onClose,
}) {
  return (
    <Drawer
      variant={variant}
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: 220, bgcolor: 'background.default', borderRight: 1, borderColor: 'divider' } }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={onSave} title="Save Post">
            <ListItemIcon><SaveIcon color="primary" /></ListItemIcon>
            <ListItemText primary="Save" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={onLoad} title="Load Post">
            <ListItemIcon><FolderOpenIcon color="primary" /></ListItemIcon>
            <ListItemText primary="Load" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <label style={{ width: '100%' }}>
            <ListItemButton component="span" title="Import File">
              <ListItemIcon><InsertDriveFileIcon color="primary" /></ListItemIcon>
              <ListItemText primary="Import File" />
            </ListItemButton>
            <input
              type="file"
              accept=".txt,.docx,.pdf"
              ref={fileInputRef}
              onChange={onImportFile}
              style={{ display: 'none' }}
            />
          </label>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={onExportTxt} title="Export as .txt">
            <ListItemIcon><DescriptionIcon color="primary" /></ListItemIcon>
            <ListItemText primary="Export .txt" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={onExportHtml} title="Export as .html">
            <ListItemIcon><LanguageIcon color="primary" /></ListItemIcon>
            <ListItemText primary="Export .html" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={onExportDocx} title="Export as .docx">
            <ListItemIcon><ArticleIcon color="primary" /></ListItemIcon>
            <ListItemText primary="Export .docx" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={onExportPdf} title="Export as .pdf">
            <ListItemIcon><PictureAsPdfIcon color="primary" /></ListItemIcon>
            <ListItemText primary="Export .pdf" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <TextField
            label="Import from URL"
            value={importUrl}
            onChange={e => setImportUrl(e.target.value)}
            size="small"
            fullWidth
            InputProps={{ endAdornment: <LinkIcon color="primary" /> }}
            sx={{ mb: 1 }}
          />
        </ListItem>
        <ListItem>
          <Button
            onClick={onImportUrl}
            disabled={importing || !importUrl}
            variant="contained"
            color="primary"
            startIcon={<LinkIcon />}
            fullWidth
          >
            {importing ? 'Importing...' : 'Import URL'}
          </Button>
        </ListItem>
      </List>
    </Drawer>
  );
});

export default SideBar;
