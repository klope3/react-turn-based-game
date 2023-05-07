import { CellObject, CellObjectType } from "../types/gameStateTypes";
import { environment } from "./assetPaths";

export const cellObjects: CellObject[] = [
  {
    type: "rock",
    imagePath: environment.objRock1,
  },
  {
    type: "bomb",
    imagePath: "",
  },
];

export function getCellObjectData(cellObjectType: CellObjectType | undefined) {
  if (cellObjectType === undefined) return undefined;
  return cellObjects.find((obj) => obj.type === cellObjectType) as CellObject;
}
