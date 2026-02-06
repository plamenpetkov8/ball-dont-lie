// src/__tests__/integration/jerseyNumberSorting.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import App from "../../App";
import { TeamsProvider } from "../../contexts/TeamsConext";

globalThis.fetch = vi.fn();

describe("Player sorting by jersey number", () => {
  const mockPlayers = [
    {
      id: 1,
      first_name: "LeBron",
      last_name: "James",
      jersey_number: "23",
      position: "F",
      height: "6-9",
      weight: "250",
      college: "None",
      country: "USA",
      team: {
        id: 1,
        name: "Lakers",
        full_name: "Los Angeles Lakers",
        abbreviation: "LAL",
        city: "Los Angeles",
        conference: "West",
        division: "Pacific",
      },
    },
    {
      id: 2,
      first_name: "Anthony",
      last_name: "Davis",
      jersey_number: "3",
      position: "F-C",
      height: "6-10",
      weight: "253",
      college: "Kentucky",
      country: "USA",
      team: {
        id: 1,
        name: "Lakers",
        full_name: "Los Angeles Lakers",
        abbreviation: "LAL",
        city: "Los Angeles",
        conference: "West",
        division: "Pacific",
      },
    },
    {
      id: 3,
      first_name: "Austin",
      last_name: "Reaves",
      jersey_number: "15",
      position: "G",
      height: "6-5",
      weight: "206",
      college: "Oklahoma",
      country: "USA",
      team: {
        id: 1,
        name: "Lakers",
        full_name: "Los Angeles Lakers",
        abbreviation: "LAL",
        city: "Los Angeles",
        conference: "West",
        division: "Pacific",
      },
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock both fetch calls (first 100 and other 50)
    vi.mocked(globalThis.fetch)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: mockPlayers }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: [] }), // Second call returns empty
      } as Response);
  });

  it("sorts players in ascending order by jersey number initially", async () => {
    render(
      <TeamsProvider>
        <App />
      </TeamsProvider>,
    );

    // Wait for players to load
    await waitFor(
      () => {
        expect(screen.getByText("Anthony Davis")).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    // Get all player rows
    const playerRows = screen.getAllByRole("row");

    // Skip header row (index 0), check data rows
    const firstPlayer = playerRows[1];
    const secondPlayer = playerRows[2];
    const thirdPlayer = playerRows[3];

    // Ascending order: 3, 15, 23
    expect(firstPlayer).toHaveTextContent("Anthony Davis");
    expect(firstPlayer).toHaveTextContent("#3");

    expect(secondPlayer).toHaveTextContent("Austin Reaves");
    expect(secondPlayer).toHaveTextContent("#15");

    expect(thirdPlayer).toHaveTextContent("LeBron James");
    expect(thirdPlayer).toHaveTextContent("#23");
  });

  it("sorts players in descending order when sort button is clicked", async () => {
    render(
      <TeamsProvider>
        <App />
      </TeamsProvider>,
    );

    await waitFor(
      () => {
        expect(screen.getByText("Anthony Davis")).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    // Click sort button to change to Ascending (which sorts desc by jersey)
    const sortButton = screen.getByRole("button", {
      name: /Sort Jersey Numbers/i,
    });
    fireEvent.click(sortButton);

    await waitFor(() => {
      expect(screen.getByText(/Ascending/i)).toBeInTheDocument();
    });

    const playerRows = screen.getAllByRole("row");

    // Descending order: 23, 15, 3
    expect(playerRows[1]).toHaveTextContent("LeBron James");
    expect(playerRows[1]).toHaveTextContent("#23");

    expect(playerRows[2]).toHaveTextContent("Austin Reaves");
    expect(playerRows[2]).toHaveTextContent("#15");

    expect(playerRows[3]).toHaveTextContent("Anthony Davis");
    expect(playerRows[3]).toHaveTextContent("#3");
  });

  it("toggles between ascending and descending order", async () => {
    render(
      <TeamsProvider>
        <App />
      </TeamsProvider>,
    );

    await waitFor(
      () => {
        expect(screen.getByText("Anthony Davis")).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    const sortButton = screen.getByRole("button", {
      name: /Sort Jersey Numbers/i,
    });

    // Initial: Descending (ascending jersey order)
    let playerRows = screen.getAllByRole("row");
    expect(playerRows[1]).toHaveTextContent("#3");

    // Click once: Ascending (descending jersey order)
    fireEvent.click(sortButton);
    await waitFor(() => {
      expect(screen.getByText(/Ascending/i)).toBeInTheDocument();
    });
    playerRows = screen.getAllByRole("row");
    expect(playerRows[1]).toHaveTextContent("#23");

    // Click again: back to Descending (ascending jersey order)
    fireEvent.click(sortButton);
    await waitFor(() => {
      expect(screen.getByText(/Descending/i)).toBeInTheDocument();
    });
    playerRows = screen.getAllByRole("row");
    expect(playerRows[1]).toHaveTextContent("#3");
  });
});
