import { bombThrowDelay, gameBoardCellsX } from "../constants";
import {
  getClosestOpenNeighbor,
  getLinesOfSightFlat,
} from "../gridLogic/helpers";
import { minBy } from "../minMax";
import { standardAttackPlayerMutator } from "../redux/gameMutators";
import { Cell, EnemyData, EnemyType } from "../types/gameStateTypes";
import {
  areCellsAdjacent,
  flatIndexToCoords,
  getTaxicabDistance,
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
    type: "melee",
    attackRange: 1,
    timerDirection: "none",
    chooseMovementIndex(selfState, playerState, cells) {
      const closestOpenPlayerNeighbor = getClosestOpenNeighbor(
        selfState.curCellIndex,
        playerState.curCellIndex,
        cells
      );
      return closestOpenPlayerNeighbor;
    },
    tryAttackPlayer(mutableSelfState, mutablePlayerState, _, walkableGrid) {
      if (
        !areCellsAdjacent(
          mutableSelfState.curCellIndex,
          mutablePlayerState.curCellIndex,
          gameBoardCellsX
        )
      )
        return false;
      standardAttackPlayerMutator(
        mutablePlayerState,
        mutableSelfState,
        walkableGrid
      );
      return true;
    },
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
      const closestOpenPlayerNeighbor = getClosestOpenNeighbor(
        mutableSelfState.curCellIndex,
        mutablePlayerState.curCellIndex,
        mutableCells,
        true
      );
      if (closestOpenPlayerNeighbor === mutableSelfState.curCellIndex)
        return false;

      const { distance, deltaX, deltaY } = getTaxicabDistance(
        mutableSelfState.curCellIndex,
        closestOpenPlayerNeighbor,
        gameBoardCellsX
      );
      const closeEnough =
        distance <= this.attackRange + 1 &&
        deltaX <= this.attackRange &&
        deltaY <= this.attackRange;
      if (!closeEnough) return false;

      mutableCells[closestOpenPlayerNeighbor].cellObject = {
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
      const closestOpenPlayerNeighbor = getClosestOpenNeighbor(
        selfState.curCellIndex,
        playerState.curCellIndex,
        cells
      );
      return closestOpenPlayerNeighbor;
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
