import { characters, ui } from "../../../../../data/assetPaths";
import { GridDiagram } from "./GridDiagramBg";
import "./Diagrams.css";

export function GetAttackedDiagram() {
  const cellWidth = 40;
  const temp = Array.from({ length: 3 }, () => 0);
  return (
    <GridDiagram>
      <div
        className="stretch-bg pixelate full-diagram-cell bottom-left-diagram-cell"
        style={{
          backgroundImage: `url(${characters.player})`,
        }}
      ></div>
      <div
        className="stretch-bg pixelate full-diagram-cell top-right-diagram-cell"
        style={{
          backgroundImage: `url(${characters.archer})`,
        }}
      ></div>
      {temp.map((_, i) => (
        <div
          key={i}
          className="stretch-bg pixelate"
          style={{
            position: "absolute",
            left: `${cellWidth * 2 - 5 - i * 15}px`,
            top: `${cellWidth + 15 * i}px`,
            width: `${4 * 2}px`,
            height: `${4 * 2}px`,
            backgroundImage: `url(${ui.arrowDiagRed})`,
            rotate: "180deg",
          }}
        ></div>
      ))}
      {/* <div
        className="stretch-bg pixelate"
        style={{
          position: "absolute",
          left: `${cellWidth * 2 - 5}px`,
          top: `${cellWidth}px`,
          width: `${4 * 2}px`,
          height: `${4 * 2}px`,
          backgroundImage: `url(${ui.arrowDiagRed})`,
          rotate: "180deg",
        }}
      ></div>
      <div
        className="stretch-bg pixelate"
        style={{
          position: "absolute",
          left: `${cellWidth * 2 - 20}px`,
          top: `${cellWidth + 15}px`,
          width: `${4 * 2}px`,
          height: `${4 * 2}px`,
          backgroundImage: `url(${ui.arrowDiagRed})`,
          rotate: "180deg",
        }}
      ></div>
      <div
        className="stretch-bg pixelate"
        style={{
          position: "absolute",
          left: `${cellWidth * 2 - 35}px`,
          top: `${cellWidth + 30}px`,
          width: `${4 * 2}px`,
          height: `${4 * 2}px`,
          backgroundImage: `url(${ui.arrowDiagRed})`,
          rotate: "180deg",
        }}
      ></div> */}
    </GridDiagram>
  );
}
