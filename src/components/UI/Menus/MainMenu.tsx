import { useDispatch } from "react-redux";
import { startPlaying } from "../../../redux/gameActions";

export function MainMenu() {
  const dispatch = useDispatch();
  const saveExists = localStorage.getItem("save") !== null;

  return (
    <div className="menu">
      {saveExists && <button onClick={() => startPlaying()}>Continue</button>}
      <button onClick={() => dispatch(startPlaying())}>New Game</button>
    </div>
  );
}
