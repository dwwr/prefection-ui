# prefection-ui

UI Elements inspired by Shynola Films' interpretation of the Hitchhiker's Guide in the 2005 film.

## Getting started

```bash
npm install
npm run storybook
```

Storybook runs at [http://localhost:6006](http://localhost:6006) and opens on **BarGroup → Table of Contents**.

To build a static Storybook site:

```bash
npm run build-storybook
```

Output is written to `storybook-static/`.

## Deploy (Vercel)

This repo is configured as a static Storybook app via [`vercel.json`](./vercel.json):

| Setting | Value |
|---------|--------|
| Install | `npm install` |
| Build | `npm run build-storybook` |
| Output | `storybook-static` |
| Landing | `/` → `/?path=/story/bargroup--table-of-contents` |

### Option A — Vercel Git integration

1. Push this repo to GitHub/GitLab/Bitbucket.
2. [Import the project](https://vercel.com/new) in Vercel.
3. Leave framework as Other / use overrides from `vercel.json` (no need to change build settings).
4. Deploy. Production and preview URLs will land on Table of Contents.

### Option B — Vercel CLI

```bash
npx vercel
```

Follow the prompts; `vercel.json` supplies build/output. Use `npx vercel --prod` for production.

Requires **Node 24** (`engines` in `package.json`).

## Tech stack

- React 19 + TypeScript
- Vite 8
- Emotion (`@emotion/react`)
- Storybook 10
