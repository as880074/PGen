# GEMINI.md - PGen (Prompt Manager)

## Project Overview
**PGen** is a modern, lightweight web application designed to manage, organize, and explore AI prompts and "Agent Skills". It provides a clean, card-based interface for productivity, featuring a localized experience in both Traditional Chinese and English.

### Key Technologies
- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS 4
- **State Management**: React Hooks (centralized orchestration in `App.jsx`)
- **i18n**: Custom internationalization logic in `src/i18n.js`
- **Linting**: ESLint 9

### Main Features
- **Prompt Library**: Browse prompts by categories (Work, Creative, Technical, Learning, Other), search by content, add new prompts, and copy to clipboard.
- **Skill Collection**: A specialized section for "Agent Skills" (following the `SKILL.md` / PTCF framework). Supports filtering by platform (Claude, Gemini, etc.) and MCP requirements.
- **Data Export**: Allows exporting the current in-memory skills list to a `skills.json` file for persistence.
- **Multi-language Support**: Seamlessly switch between `zh-TW` and `en` for both UI labels and content translations.

---

## Building and Running

### Prerequisites
- Node.js (Version compatible with React 19 and Vite 6/8)
- npm or yarn

### Commands
- **Install Dependencies**: `npm install`
- **Development Mode**: `npm run dev` (Runs on `http://localhost:5173` by default)
- **Production Build**: `npm run build` (Outputs to `dist/`)
- **Linting**: `npm run lint`
- **Preview Build**: `npm run preview`

---

## Development Conventions

### Component Architecture
- **Orchestration**: `src/App.jsx` handles global state, data fetching (`prompts.json`, `skills.json`), and page routing.
- **Presentational Components**: UI logic is modularized in `src/components/`:
    - `Sidebar.jsx`: Category and language navigation.
    - `PromptCard.jsx`: Individual prompt display and actions.
    - `AddPromptForm.jsx`: Input validation and submission.
    - `SkillCollectionPage.jsx`: Complex UI for skill discovery and management.

### Coding Standards
- **Hooks-First**: Use functional components and React Hooks exclusively.
- **Minimal State**: Keep state as local as possible. Use `useMemo` for derived data (e.g., filtered lists).
- **Internationalization**: NEVER hardcode user-facing strings in components. Add keys to `src/i18n.js` and pass them via props or context.
- **Styling**: Adhere to the Tailwind CSS utility-first approach. Maintain the existing spacing rhythm and color palette (Slate and Violet accents).

### Data Schema
- **Prompts**: Defined in `public/prompts.json`. Each entry includes an `id`, `category`, and `translations` (with `title` and `text`).
- **Skills**: Defined in `public/skills.json`. Includes `id`, `platforms`, `requiresMcp`, `rating`, `installs`, and `translations`.
- **Categories**: Must align with the following IDs: `all`, `work`, `creative`, `technical`, `learning`, `other`.

---

## Project Structure
- `.github/workflows/`: CI/CD for GitHub Pages deployment.
- `.github/instructions/`: Domain-specific development guidelines.
- `public/`: Static assets and JSON data files (`prompts.json`, `skills.json`).
- `src/components/`: Reusable React components.
- `src/i18n.js`: Localization dictionary and helpers.
- `src/App.jsx`: Main application entry and state logic.
