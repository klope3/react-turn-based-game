import { useDispatch } from "react-redux";
import { setMainMenu, toggleGameMenu } from "../../../redux/gameActions";
import "./Menus.css";

export function GameMenu() {
  const dispatch = useDispatch();

  return (
    <div className="menu game-menu">
      <button onClick={() => dispatch(toggleGameMenu())}>Resume</button>
      <button onClick={() => dispatch(setMainMenu())}>Main Menu</button>
    </div>
  );
}
