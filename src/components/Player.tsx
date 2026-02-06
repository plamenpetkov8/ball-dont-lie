import { Player as PlayerType } from "../types";

import styles from "./Player.module.css";

function Player({ player }: { player: PlayerType }) {
  return (
    <tr className={styles["player-container"]}>
      <td className={styles["player-info-box"]}>
        <span
          className={styles["player-name"]}
        >{`${player.first_name} ${player.last_name}`}</span>
        <span className={styles["player-others"]}>
          <span>{`Pos: ${player.position}`}</span>
          <span>{`Height: ${player.height}`}&#8243;</span>
          <span>{`Weight: ${player.weight} lbs`}</span>
        </span>
      </td>
      <td className={styles["player-jersey-number"]}>
        &#35;{player.jersey_number}
      </td>
    </tr>
  );
}

export default Player;
