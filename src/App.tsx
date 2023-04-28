import "./App.css";
import { Character } from "./components/Character/Character";
import { Grid } from "./components/Grid/Grid";
import { displayWidth } from "./constants";
import { useSelector } from "react-redux/es/exports";
import { GameState } from "./types/gameStateTypes";

function App() {
  const style = {
    maxWidth: `${displayWidth}px`,
  };
  const characters = useSelector((state: GameState) => state.activeCharacters);

  return (
    <>
      <div className="board-container" style={style}>
        {characters.map((char) => (
          <Character key={char.id} data={char} />
        ))}
        <Grid />
      </div>
    </>
  );
}

export default App;
