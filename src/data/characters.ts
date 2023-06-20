import {
  actionTimeDefault,
  bombThrowDelay,
  gameBoardCellsX,
} from "../constants";
import { animateExplosionAt, animateFromTo } from "../dynamicObjects";
import {
  getClosestOpenNeighbor,
  getLinesOfSightFlat,
} from "../gridLogic/helpers";
import { minBy } from "../minMax";
import { standardAttackPlayerMutator } from "../redux/gameMutators";
import {
  Cell,
  CellObject,
  EnemyData,
  EnemyType,
} from "../types/gameStateTypes";
import {
  areCellsAdjacent,
  flatIndexToCoords,
  getTaxicabDistance,
} from "../utility";
import { characters, environment } from "./assetPaths";
import { getCellObjectData } from "./cellObjects";

export const characterData: EnemyData[] = [
  {
    displayName: "Player",
    type: "none",
    attackType: "none",
    attackRange: 0,
    description: "none",
    timerDirection: "none",
    imagePath: characters.player,
    chooseMovementIndex: () => 0,
    tryAttackPlayer: () => false,
  },
  {
    displayName: "Goblin",
    type: "melee",
    attackType: "melee",
    attackRange: 1,
    description:
      "A simple-minded beast that attacks humans on sight. Weak on its own, stronger in numbers.",
    timerDirection: "none",
    imagePath: characters.melee,
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
    displayName: "Oculo",
    type: "archer",
    attackType: "projectile",
    attackRange: 4,
    description:
      "A scaly, skittish monster that can shoot an orb of magical energy from its single eye.",
    timerDirection: "none",
    imagePath: characters.archer,
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
      animateFromTo(
        mutableSelfState.curCellIndex,
        mutablePlayerState.curCellIndex,
        environment.orbBlue,
        "",
        true
      );
      setTimeout(() => {
        animateExplosionAt(mutablePlayerState.curCellIndex);
      }, actionTimeDefault * 1000);
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
    displayName: "Osso",
    type: "bomber",
    attackType: "explosive",
    attackRange: 2,
    description:
      'A floating skull from the depths of the underworld. Its disembodied hands can lob concentrated magical "bombs" that damage anything nearby. The bomb attack takes several turns to charge back up.',
    timerDirection: "decrement",
    imagePath: characters.bomber,
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

      const bombData = getCellObjectData("bomb") as CellObject;
      mutableCells[closestOpenPlayerNeighbor].cellObject = bombData;
      animateFromTo(
        mutableSelfState.curCellIndex,
        closestOpenPlayerNeighbor,
        bombData.imagePath,
        "bomb"
      );
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
