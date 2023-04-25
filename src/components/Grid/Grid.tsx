import { gameBoardCellsX, gameBoardCellsY } from "../../constants";
import { Cell } from "./Cell";
import { useDispatch, useSelector } from "react-redux/es/exports";
import "./Grid.css";
import { clickCell } from "../../redux/gameActions";
import { GameState } from "../../types/gameStateTypes";

export function Grid() {
  const g = Array.from({ length: gameBoardCellsX * gameBoardCellsY }, (_) => 0);
  const style = {
    gridTemplateColumns: `repeat(${gameBoardCellsX}, auto)`,
    aspectRatio: `${gameBoardCellsX / gameBoardCellsY}`,
  };
  const dispatch = useDispatch();
  const selectedCellIndex = useSelector(
    (state: GameState) => state.selectedCellIndex
  );

  function clickGrid(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const target = e.target as HTMLElement;
    if (target.dataset === undefined) return;

    const { cellindex } = target.dataset;
    if (cellindex !== undefined) {
      dispatch(clickCell(+cellindex));
    }
  }

  return (
    <div className="grid" style={style} onClick={clickGrid}>
      {g.map((_, i) => (
        <Cell flatIndex={i} isSelected={i === selectedCellIndex} />
      ))}
    </div>
  );
}
