export type GameState = {
  selectedCellIndex: number | undefined;
  activeCharacters: CharacterState[];
  userInput: boolean;
  cells: Cell[];
};

export type CharacterState = {
  enemyData: EnemyData;
  curCellIndex: number;
  health: number;
  id: number;
  timer: number;
};

export type EnemyData = {
  type: EnemyType;
  attackRange: number;
  timerDirection: ValueChangeDirection;
  tryAttackPlayer: (
    mutableSelfState: CharacterState,
    mutablePlayerState: CharacterState,
    mutableCells: Cell[],
    walkableGrid: boolean[][]
  ) => boolean;
  chooseMovementIndex: (
    selfState: CharacterState,
    playerState: CharacterState,
    cells: Cell[]
  ) => number;
};

export type Coordinates = {
  x: number;
  y: number;
};

export type Cell = {
  characterHere: CharacterState | undefined;
  cellObject: CellObject | undefined;
};

export type CellObject = {
  type: CellObjectType;
};

type CellObjectType = "rock" | "bomb";

export type EnemyType = "none" | "melee" | "archer" | "bomber";

type ValueChangeDirection = "increment" | "decrement" | "none";
