import { useQuery, keepPreviousData } from "@tanstack/react-query";

export default function Results({ query }: { query: string }) {
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["results", query],
    queryFn: async ({ signal }) => {
      console.log("Fetching results for query:", query);
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${query}`,
        { signal },
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const json = await response.json();
      return json.results;
    },
    enabled: !!query,
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <div>
      <p>{isFetching ? "Fetching..." : ""}</p>
      <h2>Results for "{query}":</h2>
      <ul>
        {data && data.length > 0 ? (
          data.map((item: any) => <li key={item.id}>{item.name}</li>)
        ) : (
          <li>No results found.</li>
        )}
      </ul>
    </div>
  );
}
