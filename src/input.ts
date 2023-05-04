import { gameBoardCellsX } from "./constants";
import { doesObjectRequireUpdate } from "./gridLogic/cellObjects";
import {
  clickCell,
  enemyTurn,
  movePlayer,
  toggleInput,
  updateCellObjects,
} from "./redux/gameActions";
import { Action, BasicAction } from "./types/actionTypes";
import { Cell, CharacterState } from "./types/gameStateTypes";
import { areCellsAdjacent } from "./utility";

export function getClickGridActions(
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  player: CharacterState | undefined,
  selectedCellIndex: number | undefined,
  cells: Cell[]
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
  const objHere = cells[clickedIndex].cellObject;
  const blocked = objHere && objHere.type === "rock";
  if (!clickedAgain || !adjacentToPlayer || blocked) {
    return [clickCell(clickedIndex)];
  }

  const actions = [movePlayer(clickedIndex), enemyTurn(), toggleInput()];
  const shouldUpdateCellObjects = cells.some(
    (cell) => cell.cellObject && doesObjectRequireUpdate(cell.cellObject)
  );

  if (shouldUpdateCellObjects) actions.splice(1, 0, updateCellObjects());

  return actions;
}
