import { useDispatch } from "react-redux";
import { setMainMenu, toggleGameMenu } from "../../../redux/gameActions";
import "./Menus.css";
import { useApp } from "../../../AppProvider";

export function GameMenu() {
  const dispatch = useDispatch();
  const { setShowInfoMenu } = useApp();

  return (
    <div className="menu game-menu">
      <button onClick={() => dispatch(toggleGameMenu())}>Resume</button>
      <button onClick={() => setShowInfoMenu(true)}>Help</button>
      <button onClick={() => dispatch(setMainMenu())}>Main Menu</button>
    </div>
  );
}
