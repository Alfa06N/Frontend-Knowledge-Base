import { render, screen, fireEvent, act } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import SearchUser from "../SearchUser";

describe("SearchUser Component", () => {
  it("should update the input value immediately", () => {
    render(<SearchUser />);

    const input = screen.getByPlaceholderText(
      /search user/i
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "Alex" } });

    // The state changes immediately
    expect(input.value).toBe("Alex");
  });

  it("shouldn't execute the search before 500ms", () => {
    render(<SearchUser />);
    const input = screen.getByPlaceholderText(/search user/i);

    fireEvent.change(input, { target: { value: "Alex" } });

    // Only 300ms
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Console shouldn't be called yet
    expect(console.log).not.toHaveBeenCalled();
  });

  it("should execute the search exactly before the delay", () => {
    render(<SearchUser />);
    const input = screen.getByPlaceholderText(/search user/i);

    fireEvent.change(input, { target: { value: "Alex" } });

    // 500ms
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Should have been called
    expect(console.log).toHaveBeenCalledWith("API query:", "Alex");
  });

  it("should reset the timer if the user is still writing", () => {
    render(<SearchUser />);
    const input = screen.getByPlaceholderText(/search user/i);

    fireEvent.change(input, { target: { value: "A" } });

    // 300ms...
    act(() => {
      vi.advanceTimersByTime(300);
    });

    fireEvent.change(input, { target: { value: "Alex" } });

    // Another 300ms...
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(console.log).not.toHaveBeenCalled();

    // 200ms...
    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith("API query:", "Alex");
  });
});
