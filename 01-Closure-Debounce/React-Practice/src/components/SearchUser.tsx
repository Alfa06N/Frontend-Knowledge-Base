import { useState, type ChangeEvent, useMemo } from "react";

type Timer = ReturnType<typeof setTimeout>;

function debounce<T extends (...args: never[]) => void>(
  callback: T,
  delay: number
) {
  let timer: Timer;

  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
}

export default function SearchUser() {
  const [query, setQuery] = useState("");

  const debouncedSearch = useMemo(
    () =>
      debounce((text: string) => {
        console.log("API query:", text);
      }, 500),
    []
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleChange}
      placeholder="Search user..."
    />
  );
}
