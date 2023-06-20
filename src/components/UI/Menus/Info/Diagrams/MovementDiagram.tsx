import { characters, ui } from "../../../../../data/assetPaths";
import { GridDiagram } from "./GridDiagramBg";
import "./Diagrams.css";

export function MovementDiagram() {
  const cellWidth = 40;
  const temp = Array.from({ length: 4 }, () => 0);
  return (
    <GridDiagram>
      <div
        className="stretch-bg pixelate full-diagram-cell centered-diagram-cell"
        style={{
          backgroundImage: `url(${characters.player})`,
        }}
      ></div>
      {temp.map((_, i) => (
        <div
          key={i}
          className="full-diagram-cell centered-diagram-cell"
          style={{
            rotate: `${i * 90}deg`,
          }}
        >
          <div
            className="stretch-bg pixelate"
            style={{
              position: "absolute",
              left: `${cellWidth + 6}px`,
              top: `${cellWidth / 2 - 5}px`,
              width: `${3 * 2}px`,
              height: `${5 * 2}px`,
              backgroundImage: `url(${ui.arrowOrtho})`,
            }}
          ></div>
        </div>
      ))}
      {temp.map((_, i) => (
        <div
          key={i}
          className="full-diagram-cell centered-diagram-cell"
          style={{
            rotate: `${i * 90}deg`,
          }}
        >
          <div
            className="stretch-bg pixelate"
            style={{
              position: "absolute",
              left: `${cellWidth - 2}px`,
              top: `${-5}px`,
              width: `${4 * 2}px`,
              height: `${4 * 2}px`,
              backgroundImage: `url(${ui.arrowDiag})`,
            }}
          ></div>
        </div>
      ))}
    </GridDiagram>
  );
}
