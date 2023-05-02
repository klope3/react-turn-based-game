import { gameBoardCellsX } from "./constants";
import {
  clickCell,
  enemyTurn,
  movePlayer,
  toggleInput,
} from "./redux/gameActions";
import { Action, BasicAction } from "./types/actionTypes";
import { CharacterData } from "./types/gameStateTypes";
import { areCellsAdjacent } from "./utility";

export function getClickGridActions(
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  player: CharacterData | undefined,
  selectedCellIndex: number | undefined
): Action[] | BasicAction[] {
  const target = e.target as HTMLElement;
  if (target.dataset === undefined || target.dataset.cellindex === undefined)
    return [];

  const clickedIndex = +target.dataset.cellindex;
  if (!player) return [];

  const clickedAgain = clickedIndex === selectedCellIndex;
  const adjacentToPlayer = areCellsAdjacent(
    player.curCellIndex,
    clickedIndex,
    gameBoardCellsX,
    true
  );

  if (clickedAgain && adjacentToPlayer) {
    return [movePlayer(clickedIndex), enemyTurn(), toggleInput()];
  } else {
    return [clickCell(clickedIndex)];
  }
}
