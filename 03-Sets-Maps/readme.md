# 03 - Sets & Maps 🧩

**Goal:** This project explores JavaScript's native data structures — `Set` and `Map` — and provides practical examples, including a React implementation for multi-selection.

---

## Why use `Set` and `Map`? 💡

- `Set` — a collection of unique values. Great for removing duplicates or checking membership in O(1).
- `Map` — a collection of key/value pairs where keys can be any type (not just strings). Useful when keys are non-primitive or when insertion order matters.

---

## Project contents 🗂️

- `toggleSelection.tsx` — utility helper to toggle selection in a collection (based on `Set`).
- `React-Practice/` — small React app that includes:
  - `src/components/MultiSelect.tsx` — component using `Set` to manage multi-selection.
  - `src/components/tests/MultiSelect.test.tsx` — tests that validate selection logic.

---

## How to run ▶️

1. Open the React practice folder:

```bash
cd 03-Sets-Maps/React-Practice
npm install
npm run dev
```

2. Run tests:

```bash
npm test
```

---

## Quick examples & notes 🔧

- Toggle selection with `Set`:

```ts
function toggleSelection<T>(set: Set<T>, item: T) {
  const next = new Set(set);
  if (next.has(item)) next.delete(item);
  else next.add(item);
  return next;
}
```

- Use `Map` to count occurrences:

```js
const counts = new Map();
for (const item of items) {
  counts.set(item, (counts.get(item) || 0) + 1);
}
```

---

## Expected takeaways ✅

- When to prefer `Set` or `Map` over arrays/objects.
- How to use these structures immutably in React.
- Best practices for unit testing collection-based logic.

---

If you want, I can add an advanced section with benchmarks, examples of complex keys in `Map`, or migration patterns from arrays to `Set`. Tell me which you'd prefer and I'll add it! 💬
