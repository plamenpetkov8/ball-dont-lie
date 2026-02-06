import { useTeams } from "../contexts/TeamsConext";

function SortButton() {
  const { order, dispatch } = useTeams();

  return (
    <button
      className="button"
      onClick={() =>
        dispatch({
          type: "order/changed",
          payload: order === "Ascending" ? "Descending" : "Ascending",
        })
      }
    >
      Sort Jersey Numbers ({order})
    </button>
  );
}

export default SortButton;
