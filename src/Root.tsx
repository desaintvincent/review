import React from 'react';
import { App } from './App';
import { ConfigProvider, useConfig } from './config/useConfig';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { NotificationProvider } from './notifications/NotificationProvider';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useMemo } from 'react';

const isHexColor = (c?: string) => !!c && /^#([0-9A-Fa-f]{3}){1,2}$/.test(c);

interface InnerRootProps {
  colorScheme: 'light' | 'dark';
  toggleColorScheme: () => void;
}

const InnerRoot: React.FC<InnerRootProps> = ({ colorScheme, toggleColorScheme }) => {
  const { config } = useConfig();
  const primaryMain = isHexColor(config.color) ? config.color! : '#3f51b5';

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: colorScheme,
          primary: { main: primaryMain },
        },
        shape: { borderRadius: 8 },
        typography: { fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif' },
      }),
    [colorScheme, primaryMain]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationProvider>
        <HashRouter>
          <App toggleColorScheme={toggleColorScheme} colorScheme={colorScheme} />
        </HashRouter>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export const Root: React.FC = () => {
  const [colorScheme, setColorScheme] = useLocalStorage<'light' | 'dark'>('color-scheme', 'dark');
  const toggleColorScheme = () => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');

  return (
    <ConfigProvider>
      <InnerRoot colorScheme={colorScheme} toggleColorScheme={toggleColorScheme} />
    </ConfigProvider>
  );
};
