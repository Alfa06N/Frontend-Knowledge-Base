# Frontend Knowledge Base ✅

**A practice repository to review essential JavaScript and React concepts.**

This repository is a learning notebook: it contains small projects and examples designed to reinforce key ideas and frontend best practices.

## 🎯 Purpose

- Improve understanding of core JavaScript concepts (closures, debounce, event loop, etc.).
- Practice building React components and writing tests.
- Keep exercises small and well-documented so anyone can read and run them.

## 📁 Main structure

- `01-Closure-Debounce/` — Exercise on closures and debounce.
  - `Vanilla/` — simple implementations in plain JavaScript (`debounce.js`, `counter.js`).
  - `React-Practice/` — React app demonstrating `debounce` inside a component, with tests.

- `02-Maps-Cache/` — Exercise exploring `Map` usage and simple caching patterns.
  - `src/cache.ts` — cache utilities and examples.
  - `src/components/UserDirectory.tsx` — React example showing cache usage in a component.

- `03-Sets-Maps/` — Exercise focusing on `Set` and `Map` with a multi-selection example.
  - `toggleSelection.tsx` — helper to toggle selections using `Set`.
  - `React-Practice/` — React multi-select component and tests.

- `04-useReducer/` — Exercise demonstrating `useReducer` with debounce and caching.
  - `src/components/AdvancedSearch.tsx` — input component with debounce, local cache (`Map`) and reducer-based state.
  - `src/hooks/searchReducer.tsx` — reducer implementation and types.

- `05-useAdvancedSearch/` — Advanced search hook and integration.
  - `src/components/AdvancedSearch.tsx` — demo component showing how to use the hook.
  - `src/hooks/useAdvancedSearch.ts` — reusable hook combining debounce, cache, and async lookup.
  - `src/hooks/searchReducer.ts` — reducer and actions for search state.
  - `src/utils/debounce.ts` — small debounce helper.

- `06-React-Query/` — Exercise demonstrating TanStack React Query for data fetching and mutations.
  - `src/components/advancedInput.tsx` — debounced search input for Rick and Morty characters.
  - `src/components/Results.tsx` — displays search results using React Query.
  - `src/components/AddCharacterForm.tsx` — form to add characters with optimistic updates.
  - `src/hooks/useAddCharacter.ts` — custom hook for mutations with error handling.
  - `src/setupTests.ts` — Vitest + `@testing-library/jest-dom` test setup and MSW mock server registration.
  - `src/custom.d.ts` — global TypeScript declarations for importing `*.css|*.scss|*.sass` files.
  - `package.json` scripts include `dev` (Vite), `build`, `preview`, and `test` (Vitest). Use `npm run test` or `npx vitest run --coverage` for running tests and coverage.

> Each exercise folder includes a `readme.md` explaining the exercise and how to run it.

## ▶️ How to use

1. Go to the exercise folder you want to examine, for example:

```bash
cd 01-Closure-Debounce/React-Practice
```

2. Install dependencies and start the app (when applicable):

```bash
npm install
npm run dev
```

3. To run tests (if any):

```bash
npm test
```

## ✨ Contributing

By Alfa06N, made with ❤️

---

> If you have questions or suggestions, feel free to open an issue or contact me directly. The goal is to make this repository useful for anyone learning frontend development! 💡
