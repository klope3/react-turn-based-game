import { useDispatch } from "react-redux";
import { setMainMenu } from "../../../redux/gameActions";

export function GameOver() {
  const dispatch = useDispatch();

  return (
    <>
      <div className="menu">
        <div>Game Over</div>
        <button
          onClick={() => {
            dispatch(setMainMenu());
          }}
        >
          Main Menu
        </button>
      </div>
    </>
  );
}
