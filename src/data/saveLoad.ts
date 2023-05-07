import {
  createDynamicObjectAt,
  deleteAllDynamicObjects,
} from "../dynamicObjects";
import { generateCells } from "../generate/environment";
import {
  Cell,
  CharacterState,
  EnemyData,
  GameState,
  SaveData,
  SavedCell,
  SavedCharacter,
} from "../types/gameStateTypes";
import { getIdCounter, setIdCounter } from "../utility";
import { environment } from "./assetPaths";
import { getCellObjectData } from "./cellObjects";
import { characterData } from "./characters";

export function saveGame(state: GameState) {
  const charactersToSave: SavedCharacter[] = state.activeCharacters.map(
    (char) => ({
      id: char.id,
      enemyType: char.enemyData.type,
      health: char.health,
      healthCapacity: char.healthCapacity,
      timer: char.timer,
      curCellIndex: char.curCellIndex,
    })
  );

  //only worry about cells that might have been modified from base level gen in some way
  const cellsToSave: SavedCell[] = state.cells
    .map((cell, i) => {
      const { cellObject, characterHere } = cell;
      if (cellObject === undefined && characterHere === undefined) {
        return undefined;
      }

      const foundCharacter = state.activeCharacters.find(
        (char) => char === characterHere
      );
      return {
        cellObjectType: cellObject ? cellObject.type : undefined,
        savedCharacterId: foundCharacter ? foundCharacter.id : undefined,
        cellIndex: i,
      };
    })
    .filter((item) => item !== undefined) as SavedCell[];

  const data: SaveData = {
    seed: state.seed,
    savedCharacters: charactersToSave,
    savedCells: cellsToSave,
    visitedWorldMapIndices: state.visitedWorldMapIndices,
    playerCurrentWorldIndex: state.playerCurrentWorldIndex,
    idCounter: getIdCounter(),
  };

  try {
    localStorage.setItem("save", JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
}

export function loadStateFromSave(): GameState | undefined {
  const saveStr = localStorage.getItem("save");
  if (!saveStr) return undefined;

  const saveData = JSON.parse(saveStr) as SaveData;
  const {
    seed,
    playerCurrentWorldIndex,
    savedCells,
    savedCharacters,
    visitedWorldMapIndices,
  } = saveData;

  const rebuiltCharacters: CharacterState[] = savedCharacters.map(
    (savedChar) => ({
      id: savedChar.id,
      curCellIndex: savedChar.curCellIndex,
      health: savedChar.health,
      healthCapacity: savedChar.healthCapacity,
      timer: savedChar.timer,
      enemyData: characterData.find(
        (data) => data.type === savedChar.enemyType
      ) as EnemyData,
    })
  );
  const rebuiltCells = generateCells(seed, playerCurrentWorldIndex);
  deleteAllDynamicObjects();
  for (const savedCell of savedCells) {
    const rebuiltCell: Cell = {
      cellObject: getCellObjectData(savedCell.cellObjectType),
      characterHere: rebuiltCharacters.find(
        (char) => char.id === savedCell.savedCharacterId
      ),
    };
    rebuiltCells[savedCell.cellIndex] = rebuiltCell;

    const cellObject = rebuiltCell.cellObject;
    if (cellObject && cellObject.type === "bomb") {
      createDynamicObjectAt(savedCell.cellIndex, environment.bomb, "bomb");
    }
  }

  const rebuiltState: GameState = {
    seed,
    playerCurrentWorldIndex,
    activeCharacters: rebuiltCharacters,
    cells: rebuiltCells,
    userInput: true,
    selectedCellIndex: undefined,
    selectedWorldMapIndex: undefined,
    showWorldMap: false,
    visitedWorldMapIndices,
  };
  setIdCounter(saveData.idCounter);

  return rebuiltState;
}
