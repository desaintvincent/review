import React, { useState } from 'react';
import { useConfig } from '../config/useConfig';
import { Paper, Typography, Button, Box } from '@mui/material';
import { IconPlus } from '@tabler/icons-react';

export const HomePage: React.FC = () => {
  const { config } = useConfig();
  const [count, setCount] = useState(0);
  return (
    <Paper elevation={2} sx={{ p: 3, maxWidth: 640, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4" component="h1">
          React + Vite + TypeScript
        </Typography>
      </Box>
      <Typography sx={{ mb: 1 }}>Bienvenue {config.username || 'anonymous'}.</Typography>
      <Typography sx={{ mb: 2 }} variant="body2" color="text.secondary">
        Base URL: {config.baseUrl || '—'} / Prefix: {config.apiPrefix || '—'}
      </Typography>
      <Button
        variant="contained"
        startIcon={<IconPlus size={16} />}
        onClick={() => setCount((c) => c + 1)}
      >
        Cliqué {count} fois
      </Button>
    </Paper>
  );
};
