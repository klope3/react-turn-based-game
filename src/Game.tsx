import { useDispatch, useSelector } from "react-redux";
import { Character } from "./components/Character/Character";
import { Grid } from "./components/Grid/Grid";
import { HealthDisplay } from "./components/UI/HealthDisplay/HealthDisplay";
import { GameMenu } from "./components/UI/Menus/GameMenu";
import {
  setMainMenu,
  toggleGameMenu,
  toggleWorldMap,
} from "./redux/gameActions";
import { WorldMap } from "./components/UI/WorldMap/WorldMap";
import { GameState } from "./types/gameStateTypes";
import { displayWidth, gameBoardCellsX, gameBoardCellsY } from "./constants";

export function Game() {
  const boardStyle = {
    aspectRatio: gameBoardCellsX / gameBoardCellsY,
    width: displayWidth,
  };
  const characters = useSelector((state: GameState) => state.activeCharacters);
  const player = characters.find((char) => char.enemyData.type === "none");
  const showWorldMap = useSelector((state: GameState) => state.showWorldMap);
  const dispatch = useDispatch();
  const gameMode = useSelector((state: GameState) => state.gameMode);
  const menuExpanded = gameMode === "gameMenu";
  const worldMapButtonText = showWorldMap ? "Back" : "World Map";

  return (
    <>
      <div className="top-bar">
        <button onClick={() => dispatch(toggleGameMenu())}>☰</button>
      </div>
      <div className="board-container" style={boardStyle}>
        {characters.map((char) => (
          <Character key={char.id} data={char} />
        ))}
        <Grid />
        {menuExpanded && (
          <>
            <div className="input-blocker"></div>
            <GameMenu />
          </>
        )}
        {showWorldMap && <WorldMap />}
      </div>
      <div className="bottom-bar">
        {player && (
          <HealthDisplay
            healthCapacity={player.healthCapacity}
            healthCurrent={player.health}
          />
        )}
        <button
          onClick={() => {
            dispatch(toggleWorldMap());
          }}
        >
          {worldMapButtonText}
        </button>
        {menuExpanded && <div className="input-blocker"></div>}
      </div>
    </>
  );
}
