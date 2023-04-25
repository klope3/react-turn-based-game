export type GameState = {
  selectedCellIndex: number | undefined;
  activeCharacters: CharacterData[];
};

export type CharacterData = {
  type: CharacterType;
  curCellIndex: number;
  health: number;
};

export type Coordinates = {
  x: number;
  y: number;
};

export type CharacterType = "player" | "enemy";
