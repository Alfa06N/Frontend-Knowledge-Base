# React Query Practice

This project demonstrates the use of **TanStack React Query** (formerly React Query) for data fetching, caching, and state management in a React application. It includes examples of queries, mutations, optimistic updates, and debouncing.

## 🚀 Features

- **Data Fetching with Queries**: Search for Rick and Morty characters using the [Rick and Morty API](https://rickandmortyapi.com/).
- **Debounced Search**: Input debouncing to reduce API calls during typing.
- **Mutations**: Add new characters with optimistic updates and error handling.
- **Caching**: Automatic caching and background refetching.
- **Loading and Error States**: Proper handling of loading, error, and fetching states.

## 🛠️ Technologies Used

- **React** with TypeScript
- **TanStack React Query** for data fetching and caching
- **Vite** for build tooling
- **ESLint** for code linting

## 📁 Project Structure

```
src/
├── components/
│   ├── AddCharacterForm.tsx    # Form to add new characters (mutation example)
│   ├── advancedInput.tsx       # Debounced search input
│   └── Results.tsx             # Displays search results (query example)
├── hooks/
│   └── useAddCharacter.ts      # Custom hook for adding characters (mutation)
├── utils/
│   └── debounce.ts             # Debounce utility (though not used in this version)
├── setupTests.ts               # Vitest/Jest DOM + MSW test setup
├── custom.d.ts                 # Global typings for importing CSS files in TS
└── App.tsx                     # Main app component with QueryClient setup
```

## ▶️ How to Run

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`.

Testing

- Run the unit tests with Vitest:

  ```bash
  npm run test
  ```

- Run tests with coverage:

  ```bash
  npx vitest run --coverage
  ```

- This project includes a test setup file at `src/setupTests.ts` which configures `@testing-library/jest-dom` and a mock server via MSW (`src/mocks`).

TypeScript + CSS imports

- If you see an error like "Cannot find module './App.css' or its corresponding type declarations", this repository includes a global declaration file `src/custom.d.ts` that declares `*.css`, `*.scss`, and `*.sass` modules so TypeScript will accept style imports. If you remove that file, recreate it with:

  ```ts
  declare module "*.css";
  declare module "*.scss";
  declare module "*.sass";
  ```

## 📖 Key Concepts Demonstrated

### Queries

- Using `useQuery` to fetch data from an API.
- Query keys for caching and invalidation.
- `enabled` option to conditionally run queries.
- `staleTime` and `placeholderData` for better UX.

### Mutations

- Using `useMutation` to perform data mutations.
- Optimistic updates with `onMutate`.
- Error handling and rollback with `onError`.
- Cache invalidation with `onSettled`.

### Debouncing

- Custom debouncing implementation using `useEffect` and `setTimeout`.

## 🧪 Testing

This project focuses on demonstrating React Query concepts. For testing examples, check other projects in the repository like `01-Closure-Debounce/React-Practice/`.

## 📚 Learn More

- [TanStack React Query Documentation](https://tanstack.com/query/latest)
- [Rick and Morty API](https://rickandmortyapi.com/)
- [Vite Documentation](https://vitejs.dev/)

## 🤝 Contributing

This is part of the Frontend Knowledge Base repository. Feel free to explore and modify the code to understand React Query better!
