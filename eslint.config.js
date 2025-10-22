// @ts-check
import js from '@eslint/js';
import globals from 'globals';
import ts from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  js.configs.recommended,
  // Base TS recommended (no type info) applied globally to TS files
  ...ts.configs.recommended,
  // Type-aware TS rules only for source & tests
  ...ts.configs.recommendedTypeChecked.map((c) => ({
    ...c,
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      ...(c.languageOptions || {}),
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.vitest.json'],
        tsconfigRootDir: process.cwd()
      }
    }
  })),
  // React + a11y + hooks + refresh
  {
    files: ['**/*.{ts,tsx,jsx,js}'],
    plugins: {
      react: react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser
      }
    },
    settings: { react: { version: 'detect' } },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off'
    }
  },
  // Prettier
  prettier,
  // Overrides for config files (turn off type-aware rules)
  {
    files: ['eslint.config.js', '*.config.{js,cjs,mjs}'],
    languageOptions: { globals: { ...globals.node } },
    rules: {
      '@typescript-eslint/await-thenable': 'off'
    }
  }
];
