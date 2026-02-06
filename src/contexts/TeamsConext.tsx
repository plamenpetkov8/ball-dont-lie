import {
  useMemo,
  useEffect,
  useContext,
  useReducer,
  createContext,
} from "react";

import { Player, TeamsObj } from "../types";
import { fetchPlayers } from "../utils/helpers";

// Private types
type Action = Record<string, string | TeamsObj>;
type State = Record<string, TeamsObj | boolean | string>;

interface TeamsContextValue {
  sortedTeams: TeamsObj | undefined;
  order: "Ascending" | "Descending";
  isLoading: boolean;
  error: string;
  dispatch: React.Dispatch<Action>;
}

const TeamsContext = createContext({});

const initialState = {
  teams: {},
  order: "Descending",
  isLoading: true,
  error: "",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "teams/loaded":
      return {
        ...state,
        teams: action.payload,
        isLoading: false,
      };

    case "order/changed":
      return {
        ...state,
        order: action.payload,
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}

function TeamsProvider({ children }: { children: React.ReactNode }) {
  const [{ teams, order, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  // Derived state
  const sortedTeams: TeamsObj | undefined = useMemo(() => {
    if (!teams || typeof teams !== "object") return undefined;

    const newTeamsObj: TeamsObj = {};
    if (order === "Ascending") {
      // Sort players by their jersey number in descending order
      for (const team in teams as TeamsObj) {
        const currTeamPlayers = teams[team];
        const sortedPlayersDesc = currTeamPlayers.sort(
          (a, b) => Number(b.jersey_number) - Number(a.jersey_number),
        );

        newTeamsObj[team] = sortedPlayersDesc;
      }
    } else {
      // Sort players by their jersey number in ascending order
      for (const team in teams) {
        const sortedPlayersAsc = teams[team].sort(
          (a, b) => Number(a.jersey_number) - Number(b.jersey_number),
        );

        newTeamsObj[team] = sortedPlayersAsc;
      }
    }

    return newTeamsObj;
  }, [order, teams]);

  // Only executed once on initial render, no need for memoization in it
  useEffect(() => {
    const loadData = async () => {
      try {
        let groupedByTeamObj: TeamsObj = {};
        const data: Player[] = await fetchAllPlayers();
        // Grouping by team (we're assuiming this are valid object and have team.name property)
        data.forEach((x) => {
          const teamName =
            x.team.full_name + "|" + x.team.abbreviation + "|" + x.team.name;

          if (!groupedByTeamObj[teamName]) {
            groupedByTeamObj[teamName] = [x];
          } else {
            groupedByTeamObj[teamName].push(x);
          }
        });

        // Sort teams alphabetically by their name
        // Note: happens only once - no need for memoization
        groupedByTeamObj = Object.fromEntries(
          Object.entries(groupedByTeamObj).sort(([keyA], [keyB]) =>
            keyA.localeCompare(keyB),
          ),
        );

        // Optimized (stable) - doesn't need to be put in the dep array of useEffect,
        // no need for useCallback
        dispatch({ type: "teams/loaded", payload: groupedByTeamObj });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload:
            error instanceof Error
              ? error.message
              : "Failed to load players data",
        });
      }
    };

    loadData();
  }, []);

  // Will get hoisted
  // No need for useCallback, since it's only used in the useEffect above,
  // which runs only once on initial render
  async function fetchAllPlayers(): Promise<Player[]> {
    const [first100Players, other50Players] = await Promise.all([
      fetchPlayers(100, 0),
      fetchPlayers(50, 100),
    ]);

    let res: Player[] = [];
    res = res.concat(first100Players || [], other50Players || []);

    return res;
  }

  return (
    <TeamsContext.Provider
      value={{ sortedTeams, order, isLoading, error, dispatch }}
    >
      {children}
    </TeamsContext.Provider>
  );
}

function useTeams() {
  const context = useContext(TeamsContext) as TeamsContextValue;
  if (context === undefined)
    throw new Error("TeamsContext was used outside the TeamsProvider");
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { TeamsProvider, useTeams };
