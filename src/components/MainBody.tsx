import TeamTable from "./TeamTable";
import SortButton from "./SortButton";
import { useTeams } from "../contexts/TeamsConext";

import styles from "./MainBody.module.css";

function MainBody() {
  const { sortedTeams } = useTeams();

  return (
    <main>
      <div className={styles["button-wrapper"]}>
        <SortButton />
      </div>
      {sortedTeams && (
        <div className={styles["tables-container"]}>
          {sortedTeams &&
            Object.keys(sortedTeams).map((team) => (
              <TeamTable
                key={team}
                teamNameKey={team}
                playersArr={sortedTeams[team]}
              />
            ))}
        </div>
      )}
    </main>
  );
}

export default MainBody;
