import React from 'react';
import { useConfig } from '../config/useConfig';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Button, Box, Divider } from '@mui/material';
import { IconSettings, IconSun, IconMoon } from '@tabler/icons-react';

interface HeaderProps {
  toggleColorScheme: () => void;
  colorScheme: 'light' | 'dark';
}

export const Header: React.FC<HeaderProps> = ({ toggleColorScheme, colorScheme }) => {
  const { config, isValid } = useConfig();
  const location = useLocation();
  const navigate = useNavigate();
  const username = config.username?.trim();

  return (
    <Box component="header" sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: isValid ? 'pointer' : 'default' }}
            onClick={() => { if (isValid) navigate('/'); }}
          >
            {username ? `Bonjour ${username}` : 'Bonjour'}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton aria-label="toggle-color-scheme" onClick={toggleColorScheme} size="large">
              {colorScheme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
            </IconButton>
            {isValid && (
              <>
                <Button
                  color={location.pathname === '/' ? 'primary' : 'inherit'}
                  onClick={() => navigate('/')}
                  aria-label="nav-home"
                >
                  Home
                </Button>
                <IconButton
                  aria-label="nav-config"
                  color={location.pathname === '/config' ? 'primary' : 'default'}
                  onClick={() => navigate('/config')}
                  size="large"
                >
                  <IconSettings size={20} />
                </IconButton>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Divider />
    </Box>
  );
};
