import { actionTimeDefault } from "../../constants";
import { CharacterState } from "../../types/gameStateTypes";
import { cellIndexToPxOffset } from "../../utility";
import "./Character.css";

type CharacterProps = {
  data: CharacterState;
};

export function Character({
  data: {
    curCellIndex,
    enemyData: { type },
  },
}: CharacterProps) {
  const pxOffset = cellIndexToPxOffset(curCellIndex);
  const style = {
    left: `${pxOffset.left}px`,
    top: `${pxOffset.top}px`,
    transition: `${actionTimeDefault}s`,
  };
  const characterType = type === "none" ? "player" : type;

  return <div className={`character ${characterType}`} style={style}></div>;
}
