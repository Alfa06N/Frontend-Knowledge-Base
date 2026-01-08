import {
  useState,
  type ChangeEvent,
  useMemo,
  useEffect,
  useCallback,
} from "react";

type Timer = ReturnType<typeof setTimeout>;
interface DebouncedFunction<T extends (...args: never[]) => void> {
  (...ags: Parameters<T>): void;
  cancel: () => void;
}

function debounce<T extends (...args: never[]) => void>(
  callback: T,
  delay: number,
): DebouncedFunction<T> {
  let timer: Timer | null;

  const executedFunction = (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };

  executedFunction.cancel = () => {
    if (timer) clearTimeout(timer);
    timer = null;
  };

  return executedFunction;
}

export default function SearchUser() {
  const [query, setQuery] = useState("");
  const [apiQuery, setApiQuery] = useState("");

  const debouncedSearch = useMemo(
    () =>
      debounce((text: string) => {
        console.log("API query:", text);
        setApiQuery(text);
      }, 1000),
    [],
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      debouncedSearch(value);
    },
    [debouncedSearch],
  );

  const cancelQuery = useCallback(() => {
    debouncedSearch.cancel();
    setQuery("");
  }, [debouncedSearch]);

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search user..."
      />
      <button onClick={cancelQuery}>Cancel</button>
      <div>
        <p>Query: {apiQuery}</p>
      </div>
    </>
  );
}
