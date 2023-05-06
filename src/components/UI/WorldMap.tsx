import { useDispatch, useSelector } from "react-redux/es/exports";
import { clickWorldCell, toggleWorldMap } from "../../redux/gameActions";
import "./WorldMap.css";
import { generateWorldMap } from "../../generate/world";
import { worldMapCellsX, worldMapCellsY } from "../../constants";
import { WorldMapCell } from "./WorldMapCell";
import { GameState } from "../../types/gameStateTypes";
import { areCellsAdjacent } from "../../utility";

export function WorldMap() {
  const style = {
    gridTemplateColumns: `repeat(${worldMapCellsX}, auto)`,
    aspectRatio: `${worldMapCellsX / worldMapCellsY}`,
  };
  const dispatch = useDispatch();
  const cells = generateWorldMap();
  const selectedIndex = useSelector(
    (state: GameState) => state.selectedWorldMapIndex
  );
  const curPlayerIndex = useSelector(
    (state: GameState) => state.playerCurrentWorldIndex
  );
  const allIndices = Array.from(
    { length: worldMapCellsX * worldMapCellsY },
    (_, i) => i
  );
  const visitedIndices = useSelector(
    (state: GameState) => state.visitedWorldMapIndices
  );
  const canBeVisitedIndices = allIndices.filter((checkIndex) =>
    visitedIndices.find((visitedIndex) =>
      areCellsAdjacent(checkIndex, visitedIndex, worldMapCellsX)
    )
  );

  function clickGrid(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const target = e.target as HTMLElement;
    const clickedIndex = target.dataset.cellindex;
    if (clickedIndex === undefined) return;

    dispatch(clickWorldCell(+clickedIndex));
  }

  return (
    <div className="world-map-container">
      <div className="grid" style={style} onClick={clickGrid}>
        {cells.map((_, i) => (
          <WorldMapCell
            isSelected={selectedIndex === i}
            wasVisited={visitedIndices.includes(i)}
            canBeVisited={canBeVisitedIndices.includes(i)}
            flatIndex={i}
            playerHere={curPlayerIndex === i}
          />
        ))}
      </div>
      <button
        onClick={() => {
          dispatch(toggleWorldMap());
        }}
      >
        Close
      </button>
    </div>
  );
}