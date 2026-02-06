import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Player from "./Player";

describe("Player Component", () => {
  const mockPlayer = {
    id: 1,
    first_name: "LeBron",
    last_name: "James",
    position: "F",
    height: "6-9",
    weight: "250",
    jersey_number: 23,
    team: {
      id: 1,
      name: "Lakers",
      full_name: "Los Angeles Lakers",
      abbreviation: "LAL",
      city: "Los Angeles",
      conference: "West",
      division: "Pacific",
    },
    college: "None",
    country: "USA",
  };

  it("renders player name", () => {
    render(
      <table>
        <tbody>
          <Player player={mockPlayer} />
        </tbody>
      </table>,
    );
    expect(screen.getByText("LeBron James")).toBeInTheDocument();
  });

  it("renders player stats", () => {
    render(
      <table>
        <tbody>
          <Player player={mockPlayer} />
        </tbody>
      </table>,
    );
    expect(screen.getByText(/Pos: F/i)).toBeInTheDocument();
    expect(screen.getByText(/Height: 6-9/i)).toBeInTheDocument();
    expect(screen.getByText(/Weight: 250 lbs/i)).toBeInTheDocument();
  });

  it("renders jersey number", () => {
    render(
      <table>
        <tbody>
          <Player player={mockPlayer} />
        </tbody>
      </table>,
    );
    expect(screen.getByText("#23")).toBeInTheDocument();
  });
});
