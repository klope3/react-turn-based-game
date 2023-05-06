import {
  actionTimeDefault,
  displayWidth,
  gameBoardCellsX,
} from "../../constants";
import { CharacterState } from "../../types/gameStateTypes";
import { cellIndexToPxOffset } from "../../utility";
import "./Character.css";

type CharacterProps = {
  data: CharacterState;
};

export function Character({
  data: {
    curCellIndex,
    enemyData: { type, imagePath },
  },
}: CharacterProps) {
  const pxOffset = cellIndexToPxOffset(curCellIndex);
  const squareSize = displayWidth / gameBoardCellsX;
  const style = {
    left: `${pxOffset.left}px`,
    top: `${pxOffset.top}px`,
    width: `${squareSize}px`,
    height: `${squareSize}px`,
    transition: `${actionTimeDefault}s`,
    backgroundImage: `url("${imagePath}")`,
  };
  const characterType = type === "none" ? "player" : type;

  return (
    <div
      className={`character stretch-bg pixelate no-click ${characterType}`}
      style={style}
    ></div>
  );
}
