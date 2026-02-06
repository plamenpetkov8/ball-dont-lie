import { Player } from "../types";
import { API_BASE_URL } from "./constants";

export async function fetchPlayers(
  amount: number,
  cursor: number,
): Promise<Player[]> {
  const response = await fetch(
    `${API_BASE_URL}?per_page=${amount}&cursor=${cursor}`,
    {
      headers: {
        Authorization: import.meta.env.VITE_BALLDONTLIE_API_KEY,
      },
    },
  ).catch((error) => {
    throw new Error(`Failed to fetch players: ${error.message}`);
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  const { data } = await response.json();

  return data;
}
