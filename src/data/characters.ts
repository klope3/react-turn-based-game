import { directions, gameBoardCellsX } from "../constants";
import { getLineOfCells, getLinesOfSightFlat } from "../gridLogic/helpers";
import { minBy } from "../minMax";
import { Cell, EnemyData, EnemyType } from "../types/gameStateTypes";
import { getTaxicabDistance } from "../utility";

export const characterData: EnemyData[] = [
  {
    type: "none",
    attackRange: 0,
    chooseAttackIndex: () => 0,
    chooseMovementIndex: () => 0,
    getAttackableIndices: () => [],
    canAttackPlayer: () => false,
  },
  {
    type: "archer",
    attackRange: 4,
    canAttackPlayer(selfState, playerState, cells) {
      const linesOfSight = directions
        .map((direction) =>
          getLineOfCells(
            cells,
            direction,
            selfState.curCellIndex,
            this.attackRange,
            standardSightBlockingFn
          )
        )
        .flat();
      const visiblePlayerCell = linesOfSight.find(
        (cell) => cell === cells[playerState.curCellIndex]
      );

      return visiblePlayerCell !== undefined;
    },
    chooseAttackIndex(_, playerState) {
      return playerState.curCellIndex;
    },
    chooseMovementIndex(selfState, playerState, cells) {
      const cellsToAttackFrom = getLinesOfSightFlat(
        cells,
        playerState.curCellIndex,
        this.attackRange,
        standardSightBlockingFn
      );
      const indicesToAttackFrom = cellsToAttackFrom.map((cell) =>
        cells.indexOf(cell)
      );

      const closest = minBy(indicesToAttackFrom, (attackIndex) => {
        return getTaxicabDistance(
          selfState.curCellIndex,
          attackIndex,
          gameBoardCellsX
        ).distance;
      });
      return closest || selfState.curCellIndex;
    },
    getAttackableIndices(selfState, cells) {
      const attackableCells = getLinesOfSightFlat(
        cells,
        selfState.curCellIndex,
        this.attackRange,
        standardSightBlockingFn
      );
      return attackableCells.map((cell) => cells.indexOf(cell));
    },
  },
];

export function getEnemyData(enemyType: EnemyType): EnemyData {
  return characterData.find((data) => data.type === enemyType) as EnemyData;
}

function standardSightBlockingFn(cell: Cell) {
  return (
    (cell.characterHere !== undefined &&
      cell.characterHere.enemyData.type !== "none") ||
    (cell.cellObject !== undefined && cell.cellObject.type === "rock")
  );
}
