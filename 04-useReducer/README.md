# 04 - useReducer

Mini-project: advanced search demo using `useReducer` (React + TypeScript + Vite).

Summary
This small app demonstrates how to manage async-like request state with `useReducer`, add a simple in-memory cache (Map), and debounce user input to avoid excessive requests.

Goals

- Show a practical `useReducer` pattern for loading / success / error flows.
- Use a simple Map-based in-memory cache to return instant results for repeated queries.
- Combine `useCallback` and `useMemo` with a `debounce` utility and proper cleanup.

How it works (high level)

- The `AdvancedSearch` component accepts user input and uses a debounced callback to run `performSearch`.
- `performSearch` checks the cache (Map) and dispatches `FETCH_SUCCESS` immediately when a cached value exists.
- If not cached, it dispatches `FETCH_START`, simulates a network delay, stores results in the cache, and dispatches `FETCH_SUCCESS` or `FETCH_ERROR`.
- The debounce utility returns a function with a `cancel` method; the component calls `cancel` on unmount to avoid side effects.

Key files

- `src/components/AdvancedSearch.tsx` — input, debounce wiring, cache, and reducer usage.
- `src/hooks/searchReducer.tsx` — reducer and typed actions: `FETCH_START`, `FETCH_SUCCESS`, `FETCH_ERROR`.
- `src/utils/debounce.ts` — debounce implementation that exposes `cancel`.

Run locally

1. Open a terminal in this folder:

```bash
cd 04-useReducer
```

2. Install and start:

```bash
npm install
npm run dev
```

3. Open the URL provided by Vite (usually `http://localhost:5173`).

Implementation notes

- Avoid relying on refs during render; this example uses a simple Map cache (module-level) instead of refs.
- The component stabilizes `performSearch` with `useCallback` and creates the debounced function with `useMemo`, adding `debouncedSearch.cancel()` in a cleanup effect.
- The reducer keeps the component state predictable and easier to test.

Extending this mini-project

- Replace the simulated `setTimeout` with a real API call (fetch/axios) in `performSearch`.
- Improve the cache to use TTLs or LRU policy.
- Add unit tests for the reducer and integration tests for the component using React Testing Library.

Author: Alfa06N
