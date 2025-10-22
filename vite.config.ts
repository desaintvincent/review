import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// Use repository name as base for GitHub Pages if not root user/organization page
const repoName = process.env.GITHUB_REPOSITORY?.split('/')?.[1];
const isPages = !!process.env.GITHUB_ACTIONS;
const explicitBase = process.env.VITE_BASE;

export default defineConfig({
  base: explicitBase ?? (isPages && repoName ? `/${repoName}/` : '/'),
  plugins: [react()],
  build: {
    sourcemap: true,
    target: 'es2022'
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    coverage: {
      reporter: ['text', 'lcov'],
      provider: 'v8'
    }
  }
});

