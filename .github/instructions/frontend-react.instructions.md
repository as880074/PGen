---
applyTo: "src/**/*.jsx,src/**/*.css"
---

# Frontend React Instructions

## Scope
- These instructions apply only to React UI and styling files.
- Keep data loading and orchestration in [src/App.jsx](src/App.jsx) unless a task explicitly requests architecture changes.

## Component Boundaries
- Keep components presentational when possible.
- [src/components/Sidebar.jsx](src/components/Sidebar.jsx) should remain focused on category/language controls.
- [src/components/AddPromptForm.jsx](src/components/AddPromptForm.jsx) should only handle prompt input and validation.
- [src/components/PromptCard.jsx](src/components/PromptCard.jsx) should only render/copy/delete card-level UI behavior.

## React Conventions
- Use function components and hooks only.
- Keep state minimal and local to the component unless shared state is required by multiple sections.
- Avoid broad refactors; make focused edits that preserve existing props and behavior.
- Prefer derived values with `useMemo` only when it improves clarity or avoids repeated heavy work.

## i18n and Text
- UI labels and static copy should come from [src/i18n.js](src/i18n.js) via `messages` props.
- Do not hardcode user-facing labels in components when equivalent keys already exist.
- When adding new UI text, add both `zh-TW` and `en` message entries.

## Styling Conventions
- Preserve existing Tailwind utility style and spacing rhythm used in [src/App.jsx](src/App.jsx).
- Do not introduce a new styling system or CSS-in-JS unless explicitly requested.
- Keep visual changes scoped to the target component; avoid global style side effects.

## Prompt UI Data Rules
- Default prompts come from [public/prompts.json](public/prompts.json); components should render localized prompt data, not redefine it.
- Category IDs must stay aligned with sidebar filters: `all`, `work`, `creative`, `technical`, `learning`, `other`.

## Validation Checklist
- Verify JSX compiles after edits.
- Ensure newly added text is localized in both languages.
- Confirm add/search/filter/copy/delete still work in the edited UI path.
