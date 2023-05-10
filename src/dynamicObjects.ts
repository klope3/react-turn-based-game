import { actionTimeDefault, displayWidth, gameBoardCellsX } from "./constants";
import { environment } from "./data/assetPaths";
import { Coordinates } from "./types/gameStateTypes";
import { flatIndexToCoords } from "./utility";

//? Currently dynamically animated objects are achieved through direct DOM manipulation.
//? Methods with React and Redux seemed too clumsy.
//? Maybe a better solution will be found in future?

//TODO: Currently the use of background-image causes some delay in image loading. Consider use of sprite sheets in future.

const squareSize = displayWidth / gameBoardCellsX;
const dynObjTag = "dynamic-object";

export function createDynamicObjectAt(
  cellIndex: number,
  imagePath: string,
  selector: string = ""
) {
  const boardContainer = document.querySelector(".board-container");
  if (!boardContainer) return undefined;

  const element = document.createElement("div");
  const coords = flatIndexToCoords(cellIndex, gameBoardCellsX);

  element.className = `stretch-bg pixelate ${selector} ${dynObjTag}`;
  element.dataset.coords = `${coords.x}, ${coords.y}`;

  const style = element.style;
  style.backgroundImage = `url("${imagePath}")`;
  setStandardSize(style);
  style.position = "absolute";
  setCoordsPosition(style, coords);

  boardContainer?.appendChild(element);

  return element;
}

export function animateFromTo(
  cellIndexOrigin: number,
  cellIndexTarget: number,
  imagePath: string,
  selector: string = "",
  deleteAtEnd: boolean = false
) {
  const element = createDynamicObjectAt(cellIndexTarget, imagePath, selector);
  if (!element) return;

  const style = element.style;
  style.transition = `${actionTimeDefault}s`;
  const originCoords = flatIndexToCoords(cellIndexOrigin, gameBoardCellsX);
  const targetCoords = flatIndexToCoords(cellIndexTarget, gameBoardCellsX);
  setCoordsPosition(style, originCoords);

  setTimeout(() => {
    setCoordsPosition(style, targetCoords);
  }, 1);
  if (deleteAtEnd) {
    setTimeout(() => {
      element.remove();
    }, actionTimeDefault * 1000);
  }
}

export function animateExplosionAt(cellIndex: number) {
  const expElement = createDynamicObjectAt(
    cellIndex,
    environment.explosionBlue1
  );
  if (!expElement) return;

  const style = expElement.style;
  style.zIndex = "20";
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

export function deleteAllDynamicObjects() {
  const objects = document.querySelectorAll(`.${dynObjTag}`);
  for (let i = 0; i < objects.length; i++) {
    objects[i].remove();
  }
}
