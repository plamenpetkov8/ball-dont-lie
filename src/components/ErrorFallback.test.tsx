import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ErrorFallback from "./ErrorFallback";

describe("ErrorFallback Component", () => {
  it("renders error message", () => {
    const error = new Error("Test error message");
    const resetFn = vi.fn();

    render(<ErrorFallback error={error} resetErrorBoundary={resetFn} />);

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("Test error message")).toBeInTheDocument();
  });

  it("calls reset function when button clicked", () => {
    const error = new Error("Test error");
    const resetFn = vi.fn();

    render(<ErrorFallback error={error} resetErrorBoundary={resetFn} />);

    fireEvent.click(
      screen.getByRole("button", { name: /Try fetching teams data again/i }),
    );
    expect(resetFn).toHaveBeenCalledTimes(1);
  });

  it("shows default message for non-Error objects", () => {
    const resetFn = vi.fn();

    render(<ErrorFallback error="string error" resetErrorBoundary={resetFn} />);

    expect(
      screen.getByText("An unexpected error occurred"),
    ).toBeInTheDocument();
  });
});
