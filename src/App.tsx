import "./App.css";
import { Character } from "./components/Character/Character";
import { Grid } from "./components/Grid/Grid";
import { displayWidth, playerHealthStart } from "./constants";
import { CharacterData } from "./types/gameStateTypes";

const defaultPlayer: CharacterData = {
  coordinates: { x: 2, y: 3 },
  health: playerHealthStart,
};

function App() {
  const style = {
    maxWidth: `${displayWidth}px`,
  };

  return (
    <>
      <div className="board-container" style={style}>
        <Character data={defaultPlayer} />
        <Grid />
      </div>
    </>
  );
}

export default App;
