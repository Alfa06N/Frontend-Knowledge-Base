import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { memo } from "react";

const fetchCharacters = async (query: string, signal?: AbortSignal) => {
  if (!query) return [];
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?name=${query}`,
    { signal },
  );
  if (response.status === 404) {
    return { results: [] };
  }
  if (!response.ok) throw new Error("Network response was not ok");
  const json = await response.json();
  return json.results;
};

const Results = memo(function Results({ query }: { query: string }) {
  console.log("Rendering results...");
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["results", query],
    queryFn: async ({ signal }) => fetchCharacters(query, signal),
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
      <h2>{query ? `Results for "${query}":` : "Filter by name"}</h2>
      <ul>
        {query ? (
          data && data.length > 0 ? (
            data.map((item: any) => <li key={item.id}>{item.name}</li>)
          ) : (
            <li>No results found.</li>
          )
        ) : (
          <li>Nothing to search</li>
        )}
      </ul>
    </div>
  );
});

export default Results;

// export default function Results({ query }: { query: string }) {
//   console.log("Rendering results...");
//   const { data, isLoading, error, isFetching } = useQuery({
//     queryKey: ["results", query],
//     queryFn: async ({ signal }) => {
//       if (!query) return [];
//       const response = await fetch(
//         `https://rickandmortyapi.com/api/character/?name=${query}`,
//         { signal },
//       );
//       if (response.status === 404) {
//         return { results: [] };
//       }
//       if (!response.ok) throw new Error("Network response was not ok");
//       const json = await response.json();
//       return json.results;
//     },
//     enabled: !!query,
//     staleTime: 5 * 60 * 1000,
//     placeholderData: keepPreviousData,
//   });

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {(error as Error).message}</div>;
//   }

//   return (
//     <div>
//       <p>{isFetching ? "Fetching..." : ""}</p>
//       <h2>{query ? `Results for "${query}":` : "Filter by name"}</h2>
//       <ul>
//         {query ? (
//           data && data.length > 0 ? (
//             data.map((item: any) => <li key={item.id}>{item.name}</li>)
//           ) : (
//             <li>No results found.</li>
//           )
//         ) : (
//           <li>Nothing to search</li>
//         )}
//       </ul>
//     </div>
//   );
// }
