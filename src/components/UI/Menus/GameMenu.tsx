import { useDispatch, useSelector } from "react-redux";
import "./Menus.css";
import { GameState } from "../../../types/gameStateTypes";
import { setMainMenu, toggleGameMenu } from "../../../redux/gameActions";

export function GameMenu() {
  const dispatch = useDispatch();
  const expanded = useSelector(
    (state: GameState) => state.gameMode === "gameMenu"
  );

  return (
    <div className="menu-container">
      <button onClick={() => dispatch(toggleGameMenu())}>☰</button>
      {expanded && (
        <div className="menu expanded-menu">
          <button onClick={() => dispatch(toggleGameMenu())}>Resume</button>
          <button onClick={() => dispatch(setMainMenu())}>Main Menu</button>
        </div>
      )}
    </div>
  );
}
