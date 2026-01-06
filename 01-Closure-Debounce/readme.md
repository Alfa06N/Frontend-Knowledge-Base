# 01 - Closure & Debounce 📚🔧

**Goal:** This exercise helps you understand and practice two key JavaScript concepts: _closures_ and _debounce_. The project includes a Vanilla JS implementation and a practical React version to see how `debounce` is used in real UIs.

---

## What is a _closure_? 🌀

A _closure_ is the combination of a function and the lexical environment where it was declared. It allows a function to remember variables from its scope even after that scope has finished executing.

Short example:

```js
function createCounter() {
  let count = 0;
  return function () {
    count += 1;
    return count;
  };
}

const c = createCounter();
console.log(c()); // 1
console.log(c()); // 2
```

Closures are useful to encapsulate state and create functions with memory.

---

## What is `debounce` and when to use it? ⏱️

`debounce` is a technique that limits how often a function is executed. It waits for a period of inactivity before calling the function. It's very useful for events that fire frequently in a short time, for example:

- Search input (avoid sending requests on every keystroke)
- Window resize
- Intensive scroll events

Typical behavior: the function is invoked only after N milliseconds have passed since the last call.

---

## What this exercise includes 🗂️

- `Vanilla/`

  - `debounce.js` — Simple debounce implementation in plain JavaScript.
  - `counter.js` — DOM example to observe the effect.

- `React-Practice/`
  - `src/components/SearchUser.tsx` — Component using debounce to limit search while the user types.
  - `src/components/tests/SearchUser.test.tsx` — Tests validating behavior (Vitest / Testing Library).
  - `package.json` — Scripts for dev and test (`npm run dev`, `npm test`).

---

## How to run the React practice (quick) ▶️

1. Inside the exercise folder:

```bash
cd 01-Closure-Debounce/React-Practice
npm install
npm run dev
```

2. Open your browser at `http://localhost:5173` (or the port shown by Vite).
3. Run tests:

```bash
npm test
```

---

## Example `debounce` (conceptual)

```js
function debounce(fn, wait = 300) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), wait);
  };
}
```

In React, the debounced function is usually created outside the render or using `useRef`/`useCallback` so it is not recreated on every render.

---

## Expected takeaways ✅

- Understand how closures work and why they matter in JavaScript.
- Know what `debounce` is, when to use it, and how to implement it.
- See how to apply these ideas in a React app and how to test the behavior.

---

You can extend the exercise by adding `leading`/`trailing` options, implementing `throttle`, converting debounce to return a promise, or adding stricter TypeScript typings.

Happy practicing and learning! 💪
