import { displayWidth, gameBoardCellsX } from "../../../constants";
import { ui } from "../../../data/assetPaths";
import "./HealthDisplay.css";

type HealthDisplayProps = {
  healthCapacity: number;
  healthCurrent: number;
};

export function HealthDisplay({
  healthCapacity,
  healthCurrent,
}: HealthDisplayProps) {
  const squareSize = displayWidth / gameBoardCellsX;
  const baseStyle = {
    width: `${squareSize}px`,
    height: `${squareSize}px`,
  };
  const fullStyle = {
    ...baseStyle,
    backgroundImage: `url("${ui.heartFull}")`,
  };
  const emptyStyle = {
    ...baseStyle,
    backgroundImage: `url("${ui.heartEmpty}")`,
  };
  const fullHearts = Array.from({ length: healthCurrent }, (_) => 0);
  const emptyHearts = Array.from(
    { length: healthCapacity - healthCurrent },
    (_) => 0
  );
  return (
    <div className="health-display">
      {fullHearts.map((_) => (
        <div className="stretch-bg pixelate" style={fullStyle}></div>
      ))}
      {emptyHearts.length > 0 &&
        emptyHearts.map((_) => (
          <div className="stretch-bg pixelate" style={emptyStyle}></div>
        ))}
    </div>
  );
}
