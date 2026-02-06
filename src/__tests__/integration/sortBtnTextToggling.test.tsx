// src/__tests__/integration/sorting.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import App from "../../App";
import { TeamsProvider } from "../../contexts/TeamsConext";

globalThis.fetch = vi.fn();

describe("Sorting functionality", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(globalThis.fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] }),
    } as Response);
  });

  it("toggles sort order button text when it gets clicked", async () => {
    render(
      <TeamsProvider>
        <App />
      </TeamsProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText(/Descending/i)).toBeInTheDocument();
    });

    const sortButton = screen.getByRole("button", {
      name: /Sort Jersey Numbers/i,
    });
    fireEvent.click(sortButton);

    await waitFor(() => {
      expect(screen.getByText(/Ascending/i)).toBeInTheDocument();
    });
  });
});
