import { useEffect, useState, useTransition } from "react";
import Results from "../Results/Results";

export default function AdvancedInput() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const handler = setTimeout(() => {
      startTransition(() => {
        setDebouncedQuery(query);
      });
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  return (
    <div className="App">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter search query"
        style={{ opacity: isPending ? 0.7 : 1 }}
      />
      {isPending && <p>Updating list...</p>}
      <div style={{ minHeight: "500px" }}>
        <Results query={debouncedQuery} />
      </div>
    </div>
  );
}
