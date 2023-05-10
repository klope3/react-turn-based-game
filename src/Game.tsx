import { useDispatch, useSelector } from "react-redux";
import { Character } from "./components/Character/Character";
import { Grid } from "./components/Grid/Grid";
import { HealthDisplay } from "./components/UI/HealthDisplay/HealthDisplay";
import { GameMenu } from "./components/UI/Menus/GameMenu";
import { toggleWorldMap } from "./redux/gameActions";
import { WorldMap } from "./components/UI/WorldMap/WorldMap";
import { GameState } from "./types/gameStateTypes";

export function Game() {
  const characters = useSelector((state: GameState) => state.activeCharacters);
  const player = characters.find((char) => char.enemyData.type === "none");
  const showWorldMap = useSelector((state: GameState) => state.showWorldMap);
  const dispatch = useDispatch();

  return (
    <>
      <GameMenu />
      <div className="board-container">
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
      </div>
    </>
  );
}
