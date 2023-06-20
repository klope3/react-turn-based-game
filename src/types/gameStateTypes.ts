export type GameState = {
  seed: number;
  selectedCellIndex: number | undefined;
  activeCharacters: CharacterState[];
  userInput: boolean;
  cells: Cell[];
  showWorldMap: boolean;
  visitedWorldMapIndices: number[];
  selectedWorldMapIndex: number | undefined;
  playerCurrentWorldIndex: number;
  gameMode: GameMode;
  gameEndStatus: GameEndStatus;
};

export type CharacterState = {
  enemyData: EnemyData;
  curCellIndex: number;
  health: number;
  healthCapacity: number;
  id: number;
  timer: number;
};

export type EnemyData = {
  displayName: string;
  type: EnemyType;
  attackType: AttackType;
  attackRange: number;
  description: string;
  timerDirection: ValueChangeDirection;
  imagePath: string;
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
  imagePath: string;
  recreateOnLoad: boolean;
  displayedByCell: boolean;
  selector: string;
};

export type CellObjectType = "rock" | "bomb";

export type EnemyType = "none" | "melee" | "archer" | "bomber";

export type AttackType = "none" | "melee" | "projectile" | "explosive";

type ValueChangeDirection = "increment" | "decrement" | "none";

export type WorldMapCell = {
  data: WorldRegionData;
  visited: false;
};

type WorldRegionData = {
  type: WorldRegionType;
};

type WorldRegionType = "wasteland";

export type SaveData = {
  seed: number;
  savedCharacters: SavedCharacter[];
  savedCells: SavedCell[];
  visitedWorldMapIndices: number[];
  playerCurrentWorldIndex: number;
  idCounter: number;
};

export type SavedCharacter = Omit<CharacterState, "enemyData"> & {
  enemyType: EnemyType;
};

export type SavedCell = {
  cellObjectType: CellObjectType | undefined;
  savedCharacterId: number | undefined;
  cellIndex: number;
};

export type GameMode = "play" | "gameMenu" | "mainMenu";

type GameEndStatus = "lost" | "won" | "neither";
