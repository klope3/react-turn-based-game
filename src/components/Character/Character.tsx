import { CharacterData } from "../../types/gameStateTypes";
import { cellIndexToPxOffset } from "../../utility";
import "./Character.css";

type CharacterProps = {
  data: CharacterData;
};

export function Character({ data: { curCellIndex, type } }: CharacterProps) {
  const pxOffset = cellIndexToPxOffset(curCellIndex);
  const style = {
    left: `${pxOffset.left}px`,
    top: `${pxOffset.top}px`,
  };

  return <div className={`character ${type}`} style={style}></div>;
}
