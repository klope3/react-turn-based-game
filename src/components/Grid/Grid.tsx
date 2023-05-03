import { useDispatch, useSelector } from "react-redux/es/exports";
import {
  actionTimeDefault,
  gameBoardCellsX,
  gameBoardCellsY,
} from "../../constants";
import { getClickGridActions } from "../../input";
import { GameState } from "../../types/gameStateTypes";
import { usePlayer } from "../../utility";
import { Cell } from "./Cell";
import "./Grid.css";

export function Grid() {
  const style = {
    gridTemplateColumns: `repeat(${gameBoardCellsX}, auto)`,
    aspectRatio: `${gameBoardCellsX / gameBoardCellsY}`,
  };
  const dispatch = useDispatch();
  const cells = useSelector((state: GameState) => state.cells);
  const selectedCellIndex = useSelector(
    (state: GameState) => state.selectedCellIndex
  );
  const userInput = useSelector((state: GameState) => state.userInput);
  const player = usePlayer();

  function clickGrid(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!userInput) return;

    const actions = getClickGridActions(e, player, selectedCellIndex, cells);
    for (let i = 0; i < actions.length; i++) {
      const delay = actionTimeDefault * i * 1000;
      if (delay === 0) dispatch(actions[i]);
      else {
        setTimeout(() => {
          dispatch(actions[i]);
        }, delay);
      }
    }
  }

  return (
    <div className="grid" style={style} onClick={clickGrid}>
      {cells.map((cell, i) => (
        <Cell
          flatIndex={i}
          isSelected={i === selectedCellIndex}
          cellData={cell}
        />
      ))}
    </div>
  );
}
