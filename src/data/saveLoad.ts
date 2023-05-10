import {
  createDynamicObjectAt,
  deleteAllDynamicObjects,
} from "../dynamicObjects";
import { generateCells } from "../generate/environment";
import { store } from "../redux/gameStore";
import {
  Cell,
  CharacterState,
  EnemyData,
  GameState,
  SaveData,
  SavedCell,
  SavedCharacter,
} from "../types/gameStateTypes";
import { doIntervalWhile, getIdCounter, setIdCounter } from "../utility";
import { getCellObjectData } from "./cellObjects";
import { characterData } from "./characters";

export function saveGame() {
  const state = store.getState();
  const charactersToSave: SavedCharacter[] = createCharactersToSave(
    state.activeCharacters
  );

  const cellsToSave: SavedCell[] = createCellsToSave(
    state.cells,
    state.activeCharacters
  );

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
    savedCharacters,
    visitedWorldMapIndices,
  } = saveData;

  const rebuiltCharacters: CharacterState[] =
    rebuildCharacters(savedCharacters);
  deleteAllDynamicObjects();
  const rebuiltCells = rebuildCells(saveData, rebuiltCharacters);

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
    gameMode: "play",
  };
  setIdCounter(saveData.idCounter);

  return rebuiltState;
}

function createCharactersToSave(characters: CharacterState[]) {
  return characters.map((char) => ({
    id: char.id,
    enemyType: char.enemyData.type,
    health: char.health,
    healthCapacity: char.healthCapacity,
    timer: char.timer,
    curCellIndex: char.curCellIndex,
  }));
}

function createCellsToSave(
  cells: Cell[],
  originalCharacters: CharacterState[]
) {
  //only worry about cells that might have been modified from base level gen in some way
  return cells
    .map((cell, i) => {
      const { cellObject, characterHere } = cell;
      if (cellObject === undefined && characterHere === undefined) {
        return undefined;
      }

      const foundCharacter = originalCharacters.find(
        (char) => char === characterHere
      );
      return {
        cellObjectType: cellObject ? cellObject.type : undefined,
        savedCharacterId: foundCharacter ? foundCharacter.id : undefined,
        cellIndex: i,
      };
    })
    .filter((item) => item !== undefined) as SavedCell[];
}

function rebuildCharacters(savedCharacters: SavedCharacter[]) {
  return savedCharacters.map((savedChar) => ({
    id: savedChar.id,
    curCellIndex: savedChar.curCellIndex,
    health: savedChar.health,
    healthCapacity: savedChar.healthCapacity,
    timer: savedChar.timer,
    enemyData: characterData.find(
      (data) => data.type === savedChar.enemyType
    ) as EnemyData,
  }));
}

function rebuildCells(saveData: SaveData, rebuiltCharacters: CharacterState[]) {
  const { seed, playerCurrentWorldIndex, savedCells } = saveData;

  //first generate what the untouched level would look like based on the seed and region
  const cells = generateCells(seed, playerCurrentWorldIndex);

  //then alter the level based on the saved data
  for (const savedCell of savedCells) {
    const rebuiltCell: Cell = {
      cellObject: getCellObjectData(savedCell.cellObjectType),
      characterHere: rebuiltCharacters.find(
        (char) => char.id === savedCell.savedCharacterId
      ),
    };
    cells[savedCell.cellIndex] = rebuiltCell;

    const cellObject = rebuiltCell.cellObject;
    if (cellObject && cellObject.recreateOnLoad) {
      let created = false;
      //on initial load, the parent for the object might not have been mounted yet.
      //this would cause the object to never be appended and therefore lost.
      //keep trying to create the object until it succeeds.
      doIntervalWhile(
        () => {
          created =
            createDynamicObjectAt(
              savedCell.cellIndex,
              cellObject.imagePath,
              cellObject.selector
            ) !== undefined;
        },
        200,
        () => !created
      );
    }
  }

  return cells;
}
