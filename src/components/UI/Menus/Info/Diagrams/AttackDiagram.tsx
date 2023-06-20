import { characters, ui } from "../../../../../data/assetPaths";
import { GridDiagram } from "./GridDiagramBg";
import "./Diagrams.css";

export function AttackDiagram() {
  const cellWidth = 40;
  return (
    <GridDiagram>
      <div
        className="stretch-bg pixelate full-diagram-cell centered-diagram-cell"
        style={{
          backgroundImage: `url(${characters.player})`,
        }}
      ></div>
      <div
        className="stretch-bg pixelate full-diagram-cell right-diagram-cell"
        style={{
          backgroundImage: `url(${characters.archer})`,
        }}
      ></div>
      <div
        className="stretch-bg pixelate"
        style={{
          position: "absolute",
          left: `${cellWidth * 2 - 3}px`,
          top: `${cellWidth * 1.5 - 5}px`,
          width: `${3 * 2}px`,
          height: `${5 * 2}px`,
          backgroundImage: `url(${ui.arrowOrtho})`,
        }}
      ></div>
    </GridDiagram>
  );
}
