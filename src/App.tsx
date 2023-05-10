import { useSelector } from "react-redux/es/exports";
import "./App.css";
import { Game } from "./Game";
import { displayWidth } from "./constants";
import { GameState } from "./types/gameStateTypes";
import { MainMenu } from "./components/UI/Menus/MainMenu";

function App() {
  const style = {
    maxWidth: `${displayWidth}px`,
  };
  const gameMode = useSelector((state: GameState) => state.gameMode);
  const showGame = gameMode === "play" || gameMode === "gameMenu";
  const mainMenu = gameMode === "mainMenu";

  return (
    <>
      <div className="app-container" style={style}>
        {showGame && <Game />}
        {mainMenu && <MainMenu />}
      </div>
    </>
  );
}

export default App;
