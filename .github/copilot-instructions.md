# Project Guidelines

## Code Style
- Keep React code in function components with hooks, matching patterns in [src/App.jsx](src/App.jsx) and [src/components](src/components).
- Preserve existing semicolon and single-quote style in `src/**/*.jsx` and `src/i18n.js`.
- Prefer small, focused edits; avoid broad refactors unless explicitly requested.

## Architecture
- App shell and state orchestration live in [src/App.jsx](src/App.jsx).
- UI building blocks are in [src/components](src/components):
  - [src/components/Sidebar.jsx](src/components/Sidebar.jsx): category/language controls
  - [src/components/AddPromptForm.jsx](src/components/AddPromptForm.jsx): create custom prompts
  - [src/components/PromptCard.jsx](src/components/PromptCard.jsx): render/copy/delete prompt cards
- Localization labels/messages are centralized in [src/i18n.js](src/i18n.js).
- Default prompt data is loaded at runtime from [public/prompts.json](public/prompts.json) via `import.meta.env.BASE_URL`.

## Build and Test
- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build production bundle: `npm run build`
- Lint: `npm run lint`
- Preview build: `npm run preview`

## Conventions
- Keep `public/prompts.json` as an array of prompt objects with stable schema (`id`, `type`, `promptKey`, `category`, `translations`).
- Do not move static UI copy out of `src/i18n.js` unless task explicitly asks for i18n architecture changes.
- New user-created prompts are `type: "custom"` and may not include `translations`; preserve this behavior.
- Keep category IDs consistent with the sidebar/filter model (`all`, `work`, `creative`, `technical`, `learning`, `other`).

## Pitfalls
- `npm run dev` may fail if dependencies are missing; run `npm install` first.
- If `public/prompts.json` is invalid JSON or not an array, the app enters load-error state in [src/App.jsx](src/App.jsx).
- For GitHub Pages, `base` is environment-driven in [vite.config.js](vite.config.js); avoid hardcoding absolute asset paths.

## References
- Project overview and usage: [README.md](README.md)
- Deployment automation: [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml)
