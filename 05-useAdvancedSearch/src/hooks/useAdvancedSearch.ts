import { useReducer, useRef, useCallback, useMemo, useEffect } from "react";
import searchReducer, { actions, type SearchState } from "./searchReducer";
import debounce from "../utils/debounce";

const initialState: SearchState = {
  loading: false,
  error: null,
  results: [],
};

export function useAdvancedSearch(delay: number = 500) {
  const [state, dispatch] = useReducer(searchReducer, initialState);
  const cache = useRef(new Map<string, string[]>());

  const performSearch = useCallback(async (query: string) => {
    if (!query) return;
    console.log(cache);

    if (cache.current.has(query)) {
      dispatch(actions.fetchSuccess(cache.current.get(query)!));
      return;
    }

    dispatch(actions.fetchStart());

    try {
      await new Promise((r) => setTimeout(r, 800));
      const results = [`Result 1 for ${query}`, `Result 2 for ${query}`];

      cache.current.set(query, results);
      dispatch(actions.fetchSuccess(results));
    } catch (err) {
      dispatch(actions.fetchError("Failed to fetch results"));
    }
  }, []);

  const debouncedSearch = useMemo(
    () => debounce((text: string) => performSearch(text), delay),
    [performSearch, delay],
  );

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  return {
    ...state,
    search: debouncedSearch,
    cancel: () => {
      debouncedSearch.cancel();
    },
  };
}

// useSearch could be reusable for a variety of searches:
// function useSearch<T>(searchFn: (query: string) => Promise<T[]>, delay = 500) {}
