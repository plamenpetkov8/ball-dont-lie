import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TeamTableHeader from "./TeamTableHeader";

describe("TeamTableHeader Component", () => {
  it("renders team name and abbreviation", () => {
    render(
      <table>
        <TeamTableHeader
          teamNameKey="Los Angeles Lakers|LAL|Lakers"
          playersAmmount={5}
        />
      </table>,
    );
    expect(screen.getByText(/Los Angeles Lakers/i)).toBeInTheDocument();
    expect(screen.getByText(/LAL/i)).toBeInTheDocument();
  });

  it("renders player count with correct pluralization", () => {
    render(
      <table>
        <TeamTableHeader
          teamNameKey="Los Angeles Lakers|LAL|Lakers"
          playersAmmount={5}
        />
      </table>,
    );
    expect(screen.getByText("5 Players")).toBeInTheDocument();
  });

  it('shows singular "Player" for count of 1', () => {
    render(
      <table>
        <TeamTableHeader
          teamNameKey="Los Angeles Lakers|LAL|Lakers"
          playersAmmount={1}
        />
      </table>,
    );
    expect(screen.getByText("1 Player")).toBeInTheDocument();
  });
});
