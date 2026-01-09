import { useReducer, useCallback, useEffect, useMemo } from "react";
import type { SearchState } from "../hooks/searchReducer";
import searchReducer from "../hooks/searchReducer";
import debounce from "../utils/debounce";

const initialState: SearchState = {
  loading: false,
  error: null,
  results: [],
};

const cache = new Map<string, string[]>();

export function AdvancedSearch() {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  const performSearch = useCallback(async (query: string) => {
    if (!query) return;

    if (cache.has(query)) {
      dispatch({ type: "FETCH_SUCCESS", payload: cache.get(query)! });
      return;
    }

    dispatch({ type: "FETCH_START" });
    try {
      await new Promise((r) => setTimeout(r, 800));
      const results = [`Result 1 for ${query}`, `Result 2 for ${query}`];

      // Save in cache
      cache.set(query, results);
      dispatch({ type: "FETCH_SUCCESS", payload: results });
    } catch (e) {
      console.log(e);
      dispatch({ type: "FETCH_ERROR", payload: "Error fetching" });
    }
  }, []);

  const debouncedSearch = useMemo(
    () => debounce((text: string) => performSearch(text), 500),
    [performSearch]
  );

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  return (
    <div>
      <input
        type="text"
        onChange={(e) => debouncedSearch(e.target.value)}
        placeholder="Busca algo..."
      />

      {state.loading && <p>Cargando...</p>}
      {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      <ul>
        {state.results.map((res, i) => (
          <li key={i}>{res}</li>
        ))}
      </ul>
    </div>
  );
}
