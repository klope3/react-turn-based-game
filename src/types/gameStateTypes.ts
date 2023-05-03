export type GameState = {
  selectedCellIndex: number | undefined;
  activeCharacters: CharacterData[];
  userInput: boolean;
  cells: Cell[];
};

export type CharacterData = {
  enemyType?: EnemyType;
  curCellIndex: number;
  health: number;
  id: number;
};

export type Coordinates = {
  x: number;
  y: number;
};

export type Cell = {
  characterHere: CharacterData | undefined;
  cellObject: CellObject | undefined;
};

export type CellObject = {
  type: CellObjectType;
};

type CellObjectType = "rock";

type EnemyType = "melee" | "archer" | "bomber";
