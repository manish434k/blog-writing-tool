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
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ListSubheader from '@mui/material/ListSubheader';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import InfoIcon from '@mui/icons-material/Info';

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
  onClose
}) {
  // Only show close button for temporary or non-permanent modes
  const showClose = variant !== 'permanent';
  // Responsive width
  const width = typeof window !== 'undefined' && window.innerWidth < 600 ? 180 : 240;
  // Height of the header (AppBar) to offset the sidebar content
  const headerHeight = typeof window !== 'undefined' && window.innerWidth < 600 ? 56 : 64;
  return (
    <Drawer
      variant={variant}
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width,
          bgcolor: 'background.default',
          borderRight: 1,
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          mt: { xs: `${headerHeight}px`, sm: `${headerHeight}px` }, // offset for header
        }
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {showClose && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '8px 8px 0 8px' }}>
            <IconButton onClick={onClose} aria-label="Close sidebar" size="small">
              <CloseIcon />
            </IconButton>
          </div>
        )}
        <List
          subheader={<ListSubheader component="div" disableSticky>File</ListSubheader>}
        >
          <Tooltip title="Save Post" arrow><ListItem disablePadding>
            <ListItemButton onClick={onSave} title="Save Post">
              <ListItemIcon><SaveIcon color="primary" /></ListItemIcon>
              <ListItemText primary="Save" />
            </ListItemButton>
          </ListItem></Tooltip>
          <Tooltip title="Load Post" arrow><ListItem disablePadding>
            <ListItemButton onClick={onLoad} title="Load Post">
              <ListItemIcon><FolderOpenIcon color="primary" /></ListItemIcon>
              <ListItemText primary="Load" />
            </ListItemButton>
          </ListItem></Tooltip>
          <Tooltip title="Import File (.txt, .docx, .pdf)" arrow><ListItem disablePadding>
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
          </ListItem></Tooltip>
        </List>
        <List
          subheader={<ListSubheader component="div" disableSticky>Export</ListSubheader>}
        >
          <Tooltip title="Export as .txt" arrow><ListItem disablePadding>
            <ListItemButton onClick={onExportTxt} title="Export as .txt">
              <ListItemIcon><DescriptionIcon color="primary" /></ListItemIcon>
              <ListItemText primary="Export .txt" />
            </ListItemButton>
          </ListItem></Tooltip>
          <Tooltip title="Export as .html" arrow><ListItem disablePadding>
            <ListItemButton onClick={onExportHtml} title="Export as .html">
              <ListItemIcon><LanguageIcon color="primary" /></ListItemIcon>
              <ListItemText primary="Export .html" />
            </ListItemButton>
          </ListItem></Tooltip>
          <Tooltip title="Export as .docx" arrow><ListItem disablePadding>
            <ListItemButton onClick={onExportDocx} title="Export as .docx">
              <ListItemIcon><ArticleIcon color="primary" /></ListItemIcon>
              <ListItemText primary="Export .docx" />
            </ListItemButton>
          </ListItem></Tooltip>
          <Tooltip title="Export as .pdf" arrow><ListItem disablePadding>
            <ListItemButton onClick={onExportPdf} title="Export as .pdf">
              <ListItemIcon><PictureAsPdfIcon color="primary" /></ListItemIcon>
              <ListItemText primary="Export .pdf" />
            </ListItemButton>
          </ListItem></Tooltip>
        </List>
        <List
          subheader={<ListSubheader component="div" disableSticky>Import from URL</ListSubheader>}
        >
          <ListItem>
            <TextField
              label="Import from URL"
              value={importUrl}
              onChange={e => setImportUrl(e.target.value)}
              size="small"
              fullWidth
              InputProps={{ endAdornment: <LinkIcon color="primary" /> }}
              sx={{ mb: 1 }}
              tabIndex={0}
            />
          </ListItem>
          <ListItem>
            <Button
              onClick={onImportUrl}
              disabled={importing || !importUrl}
              variant="contained"
              color="primary"
              startIcon={importing ? <CircularProgress size={18} color="inherit" /> : <LinkIcon />}
              fullWidth
              tabIndex={0}
            >
              {importing ? 'Importing...' : 'Import URL'}
            </Button>
          </ListItem>
        </List>
        <div style={{ flex: 1 }} />
        <List>
          <ListItem>
            <Button
              href="#help"
              color="secondary"
              startIcon={<InfoIcon />}
              fullWidth
              sx={{ justifyContent: 'flex-start', mt: 2 }}
            >
              Help & Tips
            </Button>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
});

export default SideBar;
