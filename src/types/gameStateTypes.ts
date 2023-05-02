export type GameState = {
  selectedCellIndex: number | undefined;
  activeCharacters: CharacterData[];
  userInput: boolean;
  cells: Cell[];
};

export type CharacterData = {
  type: CharacterType;
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
};

export type CharacterType = "player" | "enemy";
