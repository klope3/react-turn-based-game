import { bombThrowDelay, gameBoardCellsX } from "../constants";
import { getLinesOfSightFlat, getOpenNeighbors } from "../gridLogic/helpers";
import { minBy } from "../minMax";
import { standardAttackPlayerMutator } from "../redux/gameMutators";
import { Cell, EnemyData, EnemyType } from "../types/gameStateTypes";
import {
  flatIndexToCoords,
  getTaxicabDistance,
  getTrueDistance,
} from "../utility";

export const characterData: EnemyData[] = [
  {
    type: "none",
    attackRange: 0,
    timerDirection: "none",
    chooseMovementIndex: () => 0,
    tryAttackPlayer: () => false,
  },
  {
    type: "archer",
    attackRange: 4,
    timerDirection: "none",
    tryAttackPlayer(
      mutableSelfState,
      mutablePlayerState,
      mutableCells,
      walkableGrid
    ) {
      const linesOfSight = getLinesOfSightFlat(
        mutableCells,
        mutableSelfState.curCellIndex,
        this.attackRange,
        standardSightBlockingFn
      );
      const visiblePlayerCell = linesOfSight.find(
        (cell) => cell === mutableCells[mutablePlayerState.curCellIndex]
      );

      const canAttack = visiblePlayerCell !== undefined;
      if (!canAttack) return false;

      standardAttackPlayerMutator(
        mutablePlayerState,
        mutableSelfState,
        walkableGrid
      );
      return true;
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
  },
  {
    type: "bomber",
    attackRange: 2,
    timerDirection: "decrement",
    tryAttackPlayer(
      mutableSelfState,
      mutablePlayerState,
      mutableCells,
      walkableGrid
    ) {
      if (mutableSelfState.timer > 0) {
        return false;
      }
      const validTargetIndices = getOpenNeighbors(
        mutablePlayerState.curCellIndex,
        mutableCells
      );
      if (validTargetIndices.length === 0) return false;

      const closest = minBy(validTargetIndices, (index) =>
        getTrueDistance(mutableSelfState.curCellIndex, index, gameBoardCellsX)
      ) as number; //if we reach this, validTargetIndices has at least one value, so this WILL be defined
      const { distance, deltaX, deltaY } = getTaxicabDistance(
        mutableSelfState.curCellIndex,
        closest,
        gameBoardCellsX
      );
      const closeEnough =
        distance <= this.attackRange + 1 &&
        deltaX <= this.attackRange &&
        deltaY <= this.attackRange;
      if (!closeEnough) return false;

      mutableCells[closest].cellObject = {
        type: "bomb",
      };
      const coords = flatIndexToCoords(
        mutableSelfState.curCellIndex,
        gameBoardCellsX
      );
      walkableGrid[coords.y][coords.x] = false;
      mutableSelfState.timer = bombThrowDelay;
      return true;
    },
    chooseMovementIndex(selfState, playerState, cells) {
      const openPlayerNeighbors = getOpenNeighbors(
        playerState.curCellIndex,
        cells
      );
      if (openPlayerNeighbors.length === 0) return selfState.curCellIndex;

      const closest = minBy(openPlayerNeighbors, (index) =>
        getTaxicabDistance(selfState.curCellIndex, index, gameBoardCellsX)
      ) as number;

      return closest;
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
