import { CellObject, CellObjectType } from "../types/gameStateTypes";
import { environment } from "./assetPaths";

export const cellObjects: CellObject[] = [
  {
    type: "rock",
    imagePath: environment.objRock1,
    recreateOnLoad: false,
    selector: "",
    displayedByCell: true,
  },
  {
    type: "bomb",
    imagePath: environment.bomb,
    recreateOnLoad: true,
    selector: "bomb",
    displayedByCell: false,
  },
];

export function getCellObjectData(cellObjectType: CellObjectType | undefined) {
  if (cellObjectType === undefined) return undefined;
  return cellObjects.find((obj) => obj.type === cellObjectType) as CellObject;
}
