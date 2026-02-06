import Player from "./Player";
import { Player as PlayerType } from "../types";

import styles from "./PlayerList.module.css";

function PlayersList({ playersArr }: { playersArr: PlayerType[] }) {
  return (
    <tbody className={styles["container"]}>
      {playersArr &&
        playersArr.map((player) => <Player key={player.id} player={player} />)}
    </tbody>
  );
}

export default PlayersList;
