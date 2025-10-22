import React from 'react';
import { useConfig } from './config/useConfig';
import { ConfigPage } from './pages/ConfigPage';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { Header } from './components/Header';
import { Container, Box } from '@mui/material';

interface AppProps {
  toggleColorScheme: () => void;
  colorScheme: 'light' | 'dark';
}

export const App = ({ toggleColorScheme, colorScheme }: AppProps) => {
  const { isValid } = useConfig();

  if (!isValid) {
    return (
      <Box>
        <Header toggleColorScheme={toggleColorScheme} colorScheme={colorScheme} />
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <ConfigPage />
        </Container>
      </Box>
    );
  }

  return (
    <Box>
      <Header toggleColorScheme={toggleColorScheme} colorScheme={colorScheme} />
      <Container maxWidth="md" sx={{ mt: 4, pb: 6 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/config" element={<ConfigPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Container>
    </Box>
  );
};
