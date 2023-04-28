import {
  actionTimeDefault,
  gameBoardCellsX,
  gameBoardCellsY,
} from "../../constants";
import { Cell } from "./Cell";
import { useDispatch, useSelector } from "react-redux/es/exports";
import "./Grid.css";
import {
  clickCell,
  enemyTurn,
  movePlayer,
  toggleInput,
} from "../../redux/gameActions";
import { GameState } from "../../types/gameStateTypes";
import { areCellsAdjacent, usePlayer } from "../../utility";

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
  const userInput = useSelector((state: GameState) => state.userInput);
  const player = usePlayer();

  function clickGrid(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!userInput) return;

    const target = e.target as HTMLElement;
    if (target.dataset === undefined || target.dataset.cellindex === undefined)
      return;

    const clickedIndex = +target.dataset.cellindex;
    if (!player) return;

    const clickedAgain = clickedIndex === selectedCellIndex;
    const adjacentToPlayer = areCellsAdjacent(
      player.curCellIndex,
      clickedIndex,
      gameBoardCellsX,
      true
    );

    if (clickedAgain && adjacentToPlayer) {
      dispatch(movePlayer(clickedIndex));
      setTimeout(() => {
        dispatch(enemyTurn());
      }, actionTimeDefault * 1000);
      setTimeout(() => {
        dispatch(toggleInput());
      }, actionTimeDefault * 1000 * 2);
    } else {
      dispatch(clickCell(clickedIndex));
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
