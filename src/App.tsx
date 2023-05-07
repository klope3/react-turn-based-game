import "./App.css";
import { Character } from "./components/Character/Character";
import { Grid } from "./components/Grid/Grid";
import { displayWidth } from "./constants";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { GameState } from "./types/gameStateTypes";
import { HealthDisplay } from "./components/UI/HealthDisplay";
import { WorldMap } from "./components/UI/WorldMap";
import { loadSaveGame, toggleWorldMap } from "./redux/gameActions";
import { saveGame } from "./data/saveLoad";

function App() {
  const style = {
    maxWidth: `${displayWidth}px`,
  };
  const characters = useSelector((state: GameState) => state.activeCharacters);
  const player = characters.find((char) => char.enemyData.type === "none");
  const showWorldMap = useSelector((state: GameState) => state.showWorldMap);
  const state = useSelector((state: GameState) => state);
  const dispatch = useDispatch();

  return (
    <>
      <div className="app-container" style={style}>
        {characters.map((char) => (
          <Character key={char.id} data={char} />
        ))}
        <Grid />
        {player && (
          <HealthDisplay
            healthCapacity={player.healthCapacity}
            healthCurrent={player.health}
          />
        )}
        {!player && <div>GAME OVER</div>}
        <button
          onClick={() => {
            dispatch(toggleWorldMap());
          }}
        >
          World Map
        </button>
        {showWorldMap && <WorldMap />}
        <button
          onClick={() => {
            saveGame(state);
          }}
        >
          Save
        </button>
        <button
          onClick={() => {
            dispatch(loadSaveGame());
          }}
        >
          Load
        </button>
      </div>
    </>
  );
}

export default App;
