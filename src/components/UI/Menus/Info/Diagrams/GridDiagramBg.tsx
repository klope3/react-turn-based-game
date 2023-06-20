import { environment } from "../../../../../data/assetPaths";
import { ReactNode } from "react";
import "./Diagrams.css";

export function GridDiagram({ children }: { children: ReactNode }) {
  const temp = Array.from({ length: 9 }, () => 0);
  const cellWidth = 40;
  return (
    <div
      className="grid-diagram"
      style={{
        width: `${cellWidth * 3}px`,
      }}
    >
      {temp.map((_) => (
        <div
          className="stretch-bg pixelate"
          style={{
            backgroundImage: `url(${environment.groundRock1})`,
            height: `${cellWidth}px`,
          }}
        ></div>
      ))}
      {children}
    </div>
  );
}
