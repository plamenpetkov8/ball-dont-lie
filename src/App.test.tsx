import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";

import App from "./App";
import { TeamsProvider } from "./contexts/TeamsConext";

// Mock fetch
globalThis.fetch = vi.fn();

describe("App Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(globalThis.fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] }),
    } as Response);
  });

  it("renders a heading after loading", async () => {
    render(
      <TeamsProvider>
        <App />
      </TeamsProvider>,
    );

    // Wait for heading to appear after loading
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /Ball Don't Lie/i }),
      ).toBeInTheDocument();
    });
  });

  it("shows loading spinner initially", () => {
    render(
      <TeamsProvider>
        <App />
      </TeamsProvider>,
    );
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByLabelText("Loading players data")).toBeInTheDocument();
  });

  it("renders sort button after loading", async () => {
    render(
      <TeamsProvider>
        <App />
      </TeamsProvider>,
    );
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /Sort Jersey Numbers/i }),
      ).toBeInTheDocument();
    });
  });
});
