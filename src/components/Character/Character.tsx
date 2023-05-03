import { actionTimeDefault } from "../../constants";
import { CharacterData } from "../../types/gameStateTypes";
import { cellIndexToPxOffset } from "../../utility";
import "./Character.css";

type CharacterProps = {
  data: CharacterData;
};

export function Character({
  data: { curCellIndex, enemyType },
}: CharacterProps) {
  const pxOffset = cellIndexToPxOffset(curCellIndex);
  const style = {
    left: `${pxOffset.left}px`,
    top: `${pxOffset.top}px`,
    transition: `${actionTimeDefault}s`,
  };
  const characterType = enemyType === undefined ? "player" : enemyType;

  return <div className={`character ${characterType}`} style={style}></div>;
}
