import { actionTimeDefault, displayWidth, gameBoardCellsX } from "./constants";
import { environment } from "./data/assetPaths";
import { Coordinates } from "./types/gameStateTypes";
import { flatIndexToCoords } from "./utility";

//? Currently dynamically animated objects are achieved through direct DOM manipulation.
//? Methods with React and Redux seemed too clumsy.
//? Maybe a better solution will be found in future?

export function throwBomb(cellIndexOrigin: number, cellIndexTarget: number) {
  const boardContainer = document.querySelector(".board-container");
  const bombElement = document.createElement("div");
  const squareSize = displayWidth / gameBoardCellsX;
  const originCoords = flatIndexToCoords(cellIndexOrigin, gameBoardCellsX);
  const targetCoords = flatIndexToCoords(cellIndexTarget, gameBoardCellsX);
  const originOffset = {
    left: `${squareSize * originCoords.x}px`,
    top: `${squareSize * originCoords.y}px`,
  };
  const targetOffset = {
    left: `${squareSize * targetCoords.x}px`,
    top: `${squareSize * targetCoords.y}px`,
  };

  bombElement.className = "stretch-bg pixelate bomb";
  bombElement.dataset.coords = `${targetCoords.x}, ${targetCoords.y}`;

  const style = bombElement.style;
  style.backgroundImage = `url("${environment.bomb}")`;
  style.width = `${squareSize}px`;
  style.height = `${squareSize}px`;
  style.position = "absolute";
  style.left = originOffset.left;
  style.top = originOffset.top;
  style.transition = `${actionTimeDefault}s`;
  setTimeout(() => {
    style.left = targetOffset.left;
    style.top = targetOffset.top;
  }, 1);

  boardContainer?.appendChild(bombElement);
}

export function deleteElementWithSelectorAt(
  selector: string,
  coords: Coordinates
) {
  const elementsWithSelector = Array.from(document.querySelectorAll(selector));
  const elementAtCoords = elementsWithSelector.find(
    (element) =>
      (element as HTMLElement).dataset.coords === `${coords.x}, ${coords.y}`
  );
  if (!elementAtCoords) {
    console.error(
      "Couldn't find element with selector " +
        selector +
        " at " +
        coords.x +
        ", " +
        coords.y +
        "!"
    );
    return;
  }
  elementAtCoords.remove();
}
