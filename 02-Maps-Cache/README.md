# Maps & Cache — 02-Maps-Cache 🔧🗺️

**A small React + TypeScript demo that teaches how to use `Map` and simple caching/memoization patterns.**

This project contains small examples and a tiny UI that illustrates: converting arrays to `Map` for O(1) lookup, client-side caching with `Map` (via `useRef`), and a lightweight `withCache` memoizer for pure functions.

---

## 🚀 What you'll learn

- How and why to use `Map` for quick lookups vs. arrays
- Simple in-memory caching strategies in React components
- A reusable memoization pattern (`withCache`) for expensive pure functions
- How to normalize arrays into `Map` for faster access

---

## ⚙️ Project highlights

- `src/normalizeData.ts` — Utility to convert an array into `Map<key, item>` for O(1) access
- `src/cache.ts` — Examples showcasing a basic `Map`-based cache and a `withCache` memoizer
- `src/components/UserDirectory.tsx` — Small UI that simulates fetching user details and caches them in a `Map` stored in `useRef`

---

## ▶️ Quick start

1. Install dependencies

```bash
npm install
```

2. Start the dev server

```bash
npm run dev
```

3. Open http://localhost:5173 and try the User Directory. Click names to simulate fetching and observe cached responses.

---

## Available scripts

- `npm run dev` — Run Vite dev server
- `npm run build` — Build production assets (`tsc -b && vite build`)
- `npm run preview` — Preview the production build
- `npm run lint` — Run ESLint

---

## Usage examples

- normalizeData

```ts
const users = [
  { id: "u1", name: "Alex" },
  { id: "u2", name: "Jo" },
];
const map = normalizeData(users, "id");
// map.get('u1') => { id: 'u1', name: 'Alex' } // O(1)
```

- withCache

```ts
const fast = withCache((s: string) => {
  // heavy computation
  return s.toUpperCase();
});

fast("a"); // computes
fast("a"); // returns cached value
```

- Component-level caching

`UserDirectory` simulates a network delay and caches user details using `useRef(new Map())`. Clicking an already-fetched name reads from the cache without the simulated delay.

---

## Files & Structure

```
02-Maps-Cache/
├─ src/
│  ├─ components/
│  │  └─ UserDirectory.tsx
│  ├─ cache.ts
│  ├─ normalizeData.ts
│  └─ App.tsx
├─ package.json
└─ tsconfig.json
```

---

## Notes & ideas for extension 💡

- Add eviction policies (LRU) or size limits to the cache
- Persist cache to `localStorage` for cross-refresh caching
- Add unit tests for `normalizeData` and `withCache`

---

## License

MIT — feel free to reuse for learning and demos.
