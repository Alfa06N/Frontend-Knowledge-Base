# 05 - useAdvancedSearch

This exercise demonstrates an advanced search pattern in React using a custom hook, a reducer for state management, debounce for input throttling, and a small in-memory cache using `Map`.

## Goals

- Build a reusable `useAdvancedSearch` hook that handles input, debounced API (or fake) calls, caching, and reducer-driven state.
- Keep examples simple and focused so you can reuse the hook in other apps.

## What’s included

- `src/hooks/useAdvancedSearch.ts` — the primary hook combining debounce, cache, and async lookup.
- `src/hooks/searchReducer.ts` — reducer and action definitions used by the hook.
- `src/components/AdvancedSearch.tsx` — a demo component showing how to use the hook.
- `src/utils/debounce.ts` — small debounce helper used by the hook/component.

## How it works (overview)

- The hook uses a `Map` to cache recent search results to avoid repeated requests.
- Input is debounced to avoid calling the search function on every keystroke.
- A reducer manages states like `loading`, `results`, and `error` so components remain simple.

## How to run

1. Open a terminal and go to the project folder:

```bash
cd 05-useAdvancedSearch
```

2. Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

3. Open the app in your browser (Vite usually opens at `http://localhost:5173`).

## Files to inspect

- `src/hooks/useAdvancedSearch.ts` — main logic
- `src/components/AdvancedSearch.tsx` — UI usage
- `src/hooks/searchReducer.ts` — reducer and actions

## Notes

- The example uses a mocked/fake search function by default — replace it with a real API call where necessary.
- The hook is intentionally small and framework-agnostic — it can be adapted for different data sources.

---

Made for learning and reuse.
