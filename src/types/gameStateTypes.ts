export type GameState = {
  activeCharacters: CharacterData[];
};

export type CharacterData = {
  coordinates: Coordinates;
  health: number;
};

export type Coordinates = {
  x: number;
  y: number;
};
