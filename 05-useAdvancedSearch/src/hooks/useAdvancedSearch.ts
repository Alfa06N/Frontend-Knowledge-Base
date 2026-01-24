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
  const abortControllerRef = useRef<AbortController | null>(null);

  const performSearch = useCallback(async (query: string) => {
    if (!query) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    if (cache.current.has(query)) {
      dispatch(actions.fetchSuccess(cache.current.get(query)!));
      return;
    }

    dispatch(actions.fetchStart());

    try {
      const response = await fetch("https://httpbin.org/delay/3", {
        method: "GET",
        signal,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = [
        "Result 1 for " + query,
        "Result 2 for " + query,
        "Result 3 for " + query,
      ];
      cache.current.set(query, data);
      dispatch(actions.fetchSuccess(data));
    } catch (err: any) {
      if (err.name === "AbortError") {
        console.log("Fetch aborted");
        return;
      }
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
