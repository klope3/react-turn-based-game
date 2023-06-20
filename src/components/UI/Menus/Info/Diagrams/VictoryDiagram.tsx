import { ui } from "../../../../../data/assetPaths";
import "./Diagrams.css";

export function VictoryDiagram() {
  const cellWidth = 40;
  return (
    <div
      style={{
        width: `${cellWidth}px`,
        height: `${cellWidth}px`,
        margin: "auto",
        position: "relative",
      }}
    >
      <div
        className="stretch-bg pixelate"
        style={{
          backgroundImage: `url(${ui.victory})`,
          width: `${cellWidth}px`,
          height: `${cellWidth}px`,
        }}
      ></div>
    </div>
  );
}
