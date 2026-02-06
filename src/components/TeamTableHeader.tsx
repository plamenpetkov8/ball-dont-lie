import styles from "./TeamTableHeader.module.css";

function TeamTableHeader({
  playersAmmount,
  teamNameKey,
}: {
  playersAmmount: number;
  teamNameKey: string;
}) {
  const [fullTeamName, teamAbbreviation, shortTeamName] =
    teamNameKey.split("|");

  return (
    <thead
      className={styles["table-header"]}
      style={
        {
          "--team-color": `var(--color-team--${shortTeamName.split(" ").join("_")})`,
        } as React.CSSProperties
      }
    >
      <tr>
        <th colSpan={2} className={styles["team-name"]}>
          {fullTeamName} &#40;{teamAbbreviation}&#41;
        </th>
        <th
          className={styles["players-amount"]}
        >{`${playersAmmount} ${playersAmmount === 1 ? "Player" : "Players"}`}</th>
      </tr>
    </thead>
  );
}

export default TeamTableHeader;
