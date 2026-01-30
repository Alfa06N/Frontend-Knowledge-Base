import userEvent from "@testing-library/user-event";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import AdvancedInput from "./AdvancedInput";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { input } from "@testing-library/user-event/dist/cjs/event/input.js";
import { http, HttpResponse } from "msw";
import { server } from "../../setupTests";

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("AdvancedInput component", () => {
  test("renders input field", () => {
    render(<AdvancedInput />, { wrapper: createWrapper() });

    const inputElement = screen.getByPlaceholderText("Enter search query");
    expect(inputElement).toBeInTheDocument();
  });

  test("updates input value on user typing", async () => {
    render(<AdvancedInput />, { wrapper: createWrapper() });

    const inputElement = screen.getByPlaceholderText(
      "Enter search query",
    ) as HTMLInputElement;

    await userEvent.type(inputElement, "Morty");

    expect(inputElement.value).toBe("Morty");
  });

  test("debounces input and passes debounced value to Results component", async () => {
    render(<AdvancedInput />, { wrapper: createWrapper() });

    const inputElement = screen.getByPlaceholderText("Enter search query");

    fireEvent.change(inputElement, { target: { value: "Rick" } });

    await waitFor(
      () => {
        expect(screen.getByText(/Results for "Rick":/i)).toBeInTheDocument();
        expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });

  test("shows 'No results found' for unknown query after debounce", async () => {
    render(<AdvancedInput />, { wrapper: createWrapper() });

    const inputElement = screen.getByPlaceholderText("Enter search query");

    fireEvent.change(inputElement, { target: { value: "Unknown" } });

    await waitFor(
      () => {
        expect(screen.getByText(/No results found./i)).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });

  test("shows 'Not found' for 404 server responses", async () => {
    server.use(
      http.get("https://rickandmortyapi.com/api/character/", () => {
        return HttpResponse.json({ message: "Not found" }, { status: 404 });
      }),
    );
    render(<AdvancedInput />, { wrapper: createWrapper() });

    const inputElement = screen.getByPlaceholderText("Enter search query");

    fireEvent.change(inputElement, { target: { value: "Rick" } });

    await waitFor(
      () => {
        expect(screen.getByText(/No results found/i)).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });

  test("should fetch results after an existen name and should show no results after changing to a non-existing name", async () => {
    render(<AdvancedInput />, { wrapper: createWrapper() });

    const inputElement = screen.getByPlaceholderText("Enter search query");

    // Type an existing name
    fireEvent.change(inputElement, { target: { value: "Rick" } });

    await waitFor(
      () => {
        expect(screen.getByText(/Results for "Rick":/i)).toBeInTheDocument();
        expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    // Change to a non-existing name
    fireEvent.change(inputElement, { target: { value: "NonExistingName" } });

    await waitFor(
      () => {
        expect(screen.getByText(/No results found./i)).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });

  test("should fetch results after an existent name and show them, then should show 'Nothing to search' when input is set to ''", async () => {
    render(<AdvancedInput />, { wrapper: createWrapper() });

    const inputElement = screen.getByPlaceholderText("Enter search query");
    fireEvent.change(inputElement, { target: { value: "Rick" } });

    await waitFor(
      () => {
        expect(screen.getByText(/Results for "Rick":/i)).toBeInTheDocument();
      },
      { timeout: 2000 },
    );

    fireEvent.change(inputElement, { target: { value: "" } });

    await waitFor(
      () => {
        expect(screen.getByText(/Nothing to search/i)).toBeInTheDocument();
      },
      { timeout: 2000 },
    );
  });
});
