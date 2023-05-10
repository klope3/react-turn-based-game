import { useDispatch } from "react-redux";
import { setMainMenu } from "../../../redux/gameActions";

export function GameOver() {
  const dispatch = useDispatch();

  return (
    <>
      <div>Game Over</div>
      <div className="menu">
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
