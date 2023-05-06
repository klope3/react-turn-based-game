import "./App.css";
import { Character } from "./components/Character/Character";
import { Grid } from "./components/Grid/Grid";
import { displayWidth } from "./constants";
import { useSelector } from "react-redux/es/exports";
import { GameState } from "./types/gameStateTypes";
import { HealthDisplay } from "./components/UI/HealthDisplay";

function App() {
  const style = {
    maxWidth: `${displayWidth}px`,
  };
  const characters = useSelector((state: GameState) => state.activeCharacters);
  const player = characters.find((char) => char.enemyData.type === "none");

  return (
    <>
      <div className="board-container" style={style}>
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
      </div>
    </>
  );
}

export default App;
