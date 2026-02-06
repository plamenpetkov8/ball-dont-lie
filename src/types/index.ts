interface Team {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
}

export interface Player {
  college: string;
  country: string;
  draft_number?: number;
  draft_round?: number | string;
  draft_year?: number;
  first_name: string;
  height: string;
  id: number;
  jersey_number: number | string;
  last_name: string;
  position: string;
  team: Team;
  weight: string | number;
}

export type TeamsObj = Record<string, Player[]>;
