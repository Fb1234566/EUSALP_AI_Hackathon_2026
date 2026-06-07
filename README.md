# EUSALP_AI_Hackathon_2026

Ionic Vue app built with Vite, TypeScript, and Capacitor dependencies.

## Prerequisites

- Node.js 18+ recommended
- npm

## Setup

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the local URL printed by Vite in your browser.

## Available scripts

```bash
npm run dev       # Start the Vite dev server
npm run build     # Type-check and build for production
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
npm run test:unit # Run Vitest unit tests
npm run test:e2e  # Run Cypress end-to-end tests
```

## Project structure

- `src/` - Vue application source code
- `public/` - Static assets copied as-is
- `resources/` - App icons and splash screens
- `dist/` - Production build output

## Ionic notes

- The app uses `@ionic/vue` and `@ionic/vue-router`.
- Capacitor packages are installed, but native Android/iOS platform folders are not committed yet.

## Useful commands for native setup

If you later add native platforms, install the platform you need and then sync Capacitor:

```bash
npm install
npx cap add android
npx cap add ios
npx cap sync
```

