import { useSelector } from "react-redux/es/exports";
import "./App.css";
import { Game } from "./Game";
import { GameOver } from "./components/UI/Menus/GameOver";
import { MainMenu } from "./components/UI/Menus/MainMenu";
import { Victory } from "./components/UI/Menus/Victory";
import { GameState } from "./types/gameStateTypes";
import { useApp } from "./AppProvider";
import { InfoMain } from "./components/UI/Menus/Info/InfoMain";

function App() {
  const gameMode = useSelector((state: GameState) => state.gameMode);
  const mainMenu = gameMode === "mainMenu";
  const gameEndStatus = useSelector((state: GameState) => state.gameEndStatus);
  const victory = gameEndStatus === "won";
  const defeat = gameEndStatus === "lost";
  const showGame =
    (gameMode === "play" || gameMode === "gameMenu") && !victory && !defeat;
  const { showInfoMenu } = useApp();

  return (
    <div className="app-container">
      {showGame && <Game />}
      {mainMenu && <MainMenu />}
      {showInfoMenu && <InfoMain />}
      {gameEndStatus === "won" && <Victory />}
      {gameEndStatus === "lost" && <GameOver />}
    </div>
  );
}

export default App;
