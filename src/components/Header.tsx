import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface HeaderProps {
  onMenuClick: () => void;
  // For future: onHelpClick, userAvatarUrl, etc.
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <AppBar position="static" color="primary" enableColorOnDark elevation={2} sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'primary.main' }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Open sidebar menu"
          onClick={onMenuClick}
          edge="start"
          sx={{ mr: 2, display: { xs: 'inline-flex', sm: 'inline-flex' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
          color="inherit"
          sx={{ flexGrow: 1, fontWeight: 'bold', fontFamily: 'Roboto, Arial, Helvetica, sans-serif', letterSpacing: 1 }}
        >
          Bloggy
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' }, mr: 2 }}>
          <Typography variant="subtitle1" color="secondary" sx={{ fontFamily: 'Merriweather, Georgia, serif' }}>
            Write with Clarity
          </Typography>
        </Box>
        {/* Future: Add more actions here */}
        <IconButton color="inherit" aria-label="Help & Tips" href="#help">
          <HelpOutlineIcon />
        </IconButton>
        {/* <Avatar alt="User" src={userAvatarUrl} sx={{ ml: 2 }} /> */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
