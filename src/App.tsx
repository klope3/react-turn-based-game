import { useSelector } from "react-redux/es/exports";
import "./App.css";
import { Game } from "./Game";
import { displayWidth } from "./constants";
import { GameState } from "./types/gameStateTypes";
import { MainMenu } from "./components/UI/Menus/MainMenu";
import { Victory } from "./components/UI/Menus/Victory";
import { GameOver } from "./components/UI/Menus/GameOver";
import { useEffect } from "react";

function App() {
  const gameMode = useSelector((state: GameState) => state.gameMode);
  const mainMenu = gameMode === "mainMenu";
  const gameEndStatus = useSelector((state: GameState) => state.gameEndStatus);
  const victory = gameEndStatus === "won";
  const defeat = gameEndStatus === "lost";
  const showGame =
    (gameMode === "play" || gameMode === "gameMenu") && !victory && !defeat;

  return (
    <>
      <div className="app-container">
        {showGame && <Game />}
        {mainMenu && <MainMenu />}
        {gameEndStatus === "won" && <Victory />}
        {gameEndStatus === "lost" && <GameOver />}
      </div>
    </>
  );
}

export default App;
