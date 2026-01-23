import { useAdvancedSearch } from "../hooks/useAdvancedSearch";

export default function AdvancedSearch() {
  const { results, loading, error, search } = useAdvancedSearch(500);

  return (
    <div>
      <input
        type="text"
        onChange={(e) => search(e.target.value)}
        placeholder="Search..."
      />

      {loading && <p>Searching...</p>}
      {error && <p>{error}</p>}

      <ul>
        {results.map((res) => (
          <li key={res}>res</li>
        ))}
      </ul>
    </div>
  );
}
