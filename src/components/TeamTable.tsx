import { Player } from "../types";
import PlayersList from "./PlayersList";
import TeamTableHeader from "./TeamTableHeader";
import { useTeams } from "../contexts/TeamsConext";

import styles from "./TeamTable.module.css";

function TeamTable({
  teamNameKey,
  playersArr,
}: {
  teamNameKey: string;
  playersArr: Player[];
}) {
  const { sortedTeams } = useTeams();

  // Derived state
  const [fullTeamName] = teamNameKey.split("|");

  if (!sortedTeams) return null;

  return (
    <table
      key={teamNameKey}
      className={styles.table}
      aria-label={`${fullTeamName} team roster`}
    >
      <ScreenReaderCaption>
        {`${fullTeamName} roster with ${playersArr.length} players`}
      </ScreenReaderCaption>
      <TeamTableHeader
        playersAmmount={playersArr.length}
        teamNameKey={teamNameKey}
      />
      <PlayersList playersArr={playersArr} />
    </table>
  );
}

function ScreenReaderCaption({ children }: { children: React.ReactNode }) {
  return (
    <caption className={`sr-only ${styles["sr-caption"]}`}>{children}</caption>
  );
}

export default TeamTable;
