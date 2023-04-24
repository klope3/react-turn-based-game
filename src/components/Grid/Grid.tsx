import { gameBoardCellsX, gameBoardCellsY } from "../../constants";
import { Cell } from "./Cell";
import "./Grid.css";

export function Grid() {
  const g = Array.from({ length: gameBoardCellsX * gameBoardCellsY }, (_) => 0);
  const style = {
    gridTemplateColumns: `repeat(${gameBoardCellsX}, auto)`,
    aspectRatio: `${gameBoardCellsX / gameBoardCellsY}`,
  };

  return (
    <div className="grid" style={style}>
      {g.map((_) => (
        <Cell />
      ))}
    </div>
  );
}
