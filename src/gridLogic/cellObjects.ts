import { CellObject } from "../types/gameStateTypes";

export function doesObjectRequireUpdate(cellObject: CellObject) {
  return cellObject.type === "bomb";
}
