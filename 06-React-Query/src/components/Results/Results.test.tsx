import { render, screen } from "@testing-library/react";
import Results from "./Results";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { delay, http, HttpResponse } from "msw";
import { server } from "../../setupTests";
import userEvent from "@testing-library/user-event";

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("Results component", () => {
  test("renders 'Nothing to search' when query is empty", () => {
    render(<Results query="" />, { wrapper: createWrapper() });

    expect(screen.getByText(/Nothing to search/i)).toBeInTheDocument();
  });

  test("renders character results when query matches", async () => {
    render(<Results query="Rick" />, { wrapper: createWrapper() });

    const characterName = await screen.findByText("Rick Sanchez");
    expect(characterName).toBeInTheDocument();
  });

  test("renders 'No results found' when query does not match", async () => {
    render(<Results query="Unknown" />, { wrapper: createWrapper() });

    const noResultsText = await screen.findByText("No results found.");
    expect(noResultsText).toBeInTheDocument();
  });

  test("should show loading message while fetching data", async () => {
    server.use(
      http.get("https://rickandmortyapi.com/api/character/", async () => {
        await delay("infinite"); // Simulate network delay
        return HttpResponse.json({
          results: [{ id: 1, name: "Rick Sanchez", status: "Alive" }],
        });
      }),
    );

    render(<Results query="Rick" />, { wrapper: createWrapper() });

    const loadingMessage = screen.getByText("Loading...");
    expect(loadingMessage).toBeInTheDocument();
  });

  test("should show error message on network error", async () => {
    server.use(
      http.get("https://rickandmortyapi.com/api/character/", () => {
        return HttpResponse.json(
          { message: "Internal Server Error" },
          { status: 500 },
        );
      }),
    );

    render(<Results query="Rick" />, { wrapper: createWrapper() });

    const errorMessage = await screen.findByText(/Error:/);
    expect(errorMessage).toBeInTheDocument();
  });
});
