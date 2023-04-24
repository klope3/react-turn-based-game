import { CharacterData } from "../../types/gameStateTypes";
import { boardCoordsToPxOffset } from "../../utility";
import "./Character.css";

type CharacterProps = {
  data: CharacterData;
};

export function Character({ data: { coordinates } }: CharacterProps) {
  const pxOffset = boardCoordsToPxOffset(coordinates);
  const style = {
    left: `${pxOffset.left}px`,
    top: `${pxOffset.top}px`,
  };

  return <div className="character" style={style}></div>;
}
