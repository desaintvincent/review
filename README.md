# review

Minimal React + TypeScript + Vite project with modern tooling.

## Stack
- React 18 + TypeScript 5
- Vite 5
- ESLint (flat config) + TypeScript ESLint + Prettier
- GitHub Actions: CI (lint, typecheck, build) & Pages deploy on push to `main`.

## Scripts
- `yarn dev` start dev server
- `yarn build` typecheck then build production bundle
- `yarn preview` preview build locally
- `yarn lint` run ESLint
- `yarn format` apply Prettier
- `yarn typecheck` TypeScript only

## GitHub Pages
On each push to `main`, a build is deployed automatically. Base path is inferred from repo name. Override with `VITE_BASE` env if needed.

## Getting Started
```bash
corepack enable
yarn install
yarn dev
```
Open http://localhost:5173

## License
MIT
