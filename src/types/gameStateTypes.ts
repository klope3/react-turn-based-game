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
};

export type EnemyData = {
  type: EnemyType;
  attackRange: number;
  getAttackableIndices: (selfState: CharacterState, cells: Cell[]) => number[];
  chooseMovementIndex: (
    selfState: CharacterState,
    playerState: CharacterState,
    cells: Cell[]
  ) => number;
  chooseAttackIndex: (
    selfState: CharacterState,
    playerState: CharacterState,
    cells: Cell[]
  ) => number;
  canAttackPlayer: (
    selfState: CharacterState,
    playerState: CharacterState,
    cells: Cell[]
  ) => boolean;
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

type CellObjectType = "rock";

export type EnemyType = "none" | "melee" | "archer" | "bomber";
