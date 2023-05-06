import { actionTimeDefault, displayWidth, gameBoardCellsX } from "./constants";
import { environment } from "./data/assetPaths";
import { Coordinates } from "./types/gameStateTypes";
import { flatIndexToCoords } from "./utility";

//? Currently dynamically animated objects are achieved through direct DOM manipulation.
//? Methods with React and Redux seemed too clumsy.
//? Maybe a better solution will be found in future?

const squareSize = displayWidth / gameBoardCellsX;

export function throwBomb(cellIndexOrigin: number, cellIndexTarget: number) {
  const boardContainer = document.querySelector(".board-container");
  const bombElement = document.createElement("div");
  const originCoords = flatIndexToCoords(cellIndexOrigin, gameBoardCellsX);
  const targetCoords = flatIndexToCoords(cellIndexTarget, gameBoardCellsX);

  bombElement.className = "stretch-bg pixelate bomb";
  bombElement.dataset.coords = `${targetCoords.x}, ${targetCoords.y}`;

  const style = bombElement.style;
  style.backgroundImage = `url("${environment.bomb}")`;
  setStandardSize(style);
  style.position = "absolute";
  setCoordsPosition(style, originCoords);
  style.transition = `${actionTimeDefault}s`;
  setTimeout(() => {
    setCoordsPosition(style, targetCoords);
  }, 1);

  boardContainer?.appendChild(bombElement);
}

export function animateExplosionAt(cellIndex: number) {
  const boardContainer = document.querySelector(".board-container");
  const expElement = document.createElement("div");
  const coords = flatIndexToCoords(cellIndex, gameBoardCellsX);

  expElement.className = "stretch-bg pixelate";

  const style = expElement.style;
  style.backgroundImage = `url("${environment.explosionBlue1}")`;
  style.position = "absolute";
  setStandardSize(style);
  setCoordsPosition(style, coords);
  const delay = 70;
  animateImageSequence(
    style,
    [
      environment.explosionBlue1,
      environment.explosionBlue2,
      environment.explosionBlue1,
      environment.explosionBlue2,
    ],
    delay
  );
  setTimeout(() => {
    expElement.remove();
  }, delay * 4);

  boardContainer?.appendChild(expElement);
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

function setStandardSize(style: CSSStyleDeclaration) {
  style.width = `${squareSize}px`;
  style.height = `${squareSize}px`;
}

function setCoordsPosition(style: CSSStyleDeclaration, coords: Coordinates) {
  style.left = `${coords.x * squareSize}px`;
  style.top = `${coords.y * squareSize}px`;
}

function doFunctionSequence(functions: (() => void)[], timePerStep: number) {
  for (let i = 0; i < functions.length; i++) {
    setTimeout(functions[i], i * timePerStep);
  }
}

function animateImageSequence(
  style: CSSStyleDeclaration,
  imagePaths: string[],
  timePerImage: number
) {
  const functions = imagePaths.map((path) => () => {
    style.backgroundImage = `url("${path}")`;
  });
  doFunctionSequence(functions, timePerImage);
}
