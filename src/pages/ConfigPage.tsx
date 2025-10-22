import React, { FormEvent } from 'react';
import { useConfig } from '../config/useConfig';
import { useNavigate } from 'react-router-dom';
import { Paper, Stack, TextField, Button, Typography, Alert, Grid, Box, Divider } from '@mui/material';
import { IconAlertCircle, IconCheck } from '@tabler/icons-react';
import { useNotification } from '../notifications/useNotification';

export const ConfigPage: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const { config, setField, save, isValid } = useConfig();
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    save();
    showNotification({ title: 'Configuration sauvegardée', message: 'Vos paramètres ont été enregistrés.', color: 'green' });
    if (onClose) {
      onClose();
    } else {
      navigate('/');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 640, mx: 'auto', borderRadius: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h5" component="h3">Configuration de l'application</Typography>
        <Divider />
        <form onSubmit={onSubmit}>
          <Stack spacing={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Base URL"
                  required
                  aria-label="base-url"
                  value={config.baseUrl}
                  onChange={(e) => setField('baseUrl', e.currentTarget.value)}
                  placeholder="https://api.example.com"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Username"
                  required
                  aria-label="username"
                  value={config.username}
                  onChange={(e) => setField('username', e.currentTarget.value)}
                  placeholder="john.doe"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="API Prefix"
                  required
                  aria-label="api-prefix"
                  value={config.apiPrefix}
                  onChange={(e) => setField('apiPrefix', e.currentTarget.value)}
                  placeholder="v1"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Couleur (optionnel)"
                  aria-label="color"
                  value={config.color || ''}
                  onChange={(e) => setField('color', e.currentTarget.value)}
                  placeholder="#ff0000"
                  fullWidth
                  type="text"
                />
              </Grid>
            </Grid>
            {!isValid && (
              <Alert icon={<IconAlertCircle size={16} />} severity="error" variant="outlined">
                Veuillez remplir tous les champs obligatoires (*).
              </Alert>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type="submit" aria-label="save-config" startIcon={<IconCheck size={16} />} variant="contained" disabled={!isValid}>
                Sauvegarder
              </Button>
            </Box>
          </Stack>
        </form>
      </Stack>
    </Paper>
  );
};
