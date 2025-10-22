import React, { useCallback, useState, ReactNode } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';
import { NotificationContext } from './context';

export interface ShowNotificationOptions {
  title?: string;
  message: string;
  color?: string;
  autoHideDuration?: number;
}

interface NotificationState extends ShowNotificationOptions {
  open: boolean;
  severity: AlertColor;
}

function mapColorToSeverity(color?: string): AlertColor {
  switch (color) {
    case 'green':
    case 'success':
      return 'success';
    case 'red':
    case 'error':
      return 'error';
    case 'yellow':
    case 'warning':
      return 'warning';
    default:
      return 'info';
  }
}

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<NotificationState | null>(null);

  const showNotification = useCallback((options: ShowNotificationOptions) => {
    setState({
      ...options,
      open: true,
      severity: mapColorToSeverity(options.color),
      autoHideDuration: options.autoHideDuration ?? 4000,
    });
  }, []);

  const handleClose = (_?: unknown, reason?: string) => {
    if (reason === 'clickaway') return;
    setState((prev) => (prev ? { ...prev, open: false } : prev));
  };

  return (
    <NotificationContext.Provider value={showNotification}>
      {children}
      <Snackbar
        open={!!state?.open}
        autoHideDuration={state?.autoHideDuration}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        {state && (
          <Alert onClose={handleClose} severity={state.severity} variant="filled" sx={{ width: '100%' }}>
            {state.title && <strong style={{ display: 'block', marginBottom: 2 }}>{state.title}</strong>}
            {state.message}
          </Alert>
        )}
      </Snackbar>
    </NotificationContext.Provider>
  );
};
