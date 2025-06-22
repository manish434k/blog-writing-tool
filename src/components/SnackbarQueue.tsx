import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import type { AlertColor } from '@mui/material/Alert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';

export interface Notification {
  open: boolean;
  message: string;
  severity: AlertColor;
}

export interface SnackbarQueueProps {
  currentSnackbar: Notification | null;
  handleSnackbarClose: (_: any, reason?: string) => void;
}

const SnackbarQueue: React.FC<SnackbarQueueProps> = ({ currentSnackbar, handleSnackbarClose }) => (
  <Snackbar
    open={!!currentSnackbar?.open}
    autoHideDuration={4000}
    onClose={handleSnackbarClose}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
  >
    <MuiAlert
      elevation={6}
      variant="filled"
      onClose={handleSnackbarClose}
      severity={currentSnackbar?.severity || 'info'}
      sx={{ width: '100%', display: 'flex', alignItems: 'center' }}
      iconMapping={{
        success: <CheckCircleIcon fontSize="inherit" />,
        error: <ErrorIcon fontSize="inherit" />,
        warning: <WarningIcon fontSize="inherit" />,
        info: <InfoIcon fontSize="inherit" />,
      }}
    >
      {currentSnackbar?.message}
    </MuiAlert>
  </Snackbar>
);

export default SnackbarQueue;
