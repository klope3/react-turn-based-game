import { characters, environment, ui } from "../../../../../data/assetPaths";
import { GridDiagram } from "./GridDiagramBg";

export function BombDiagram() {
  return (
    <GridDiagram>
      <div
        className="stretch-bg pixelate full-diagram-cell left-diagram-cell"
        style={{
          backgroundImage: `url(${characters.player})`,
        }}
      ></div>
      <div
        className="stretch-bg pixelate full-diagram-cell centered-diagram-cell"
        style={{ backgroundImage: `url(${environment.bomb})` }}
      ></div>
      <div
        className="stretch-bg pixelate full-diagram-cell top-diagram-cell"
        style={{ backgroundImage: `url(${ui.alert})` }}
      ></div>
      <div
        className="stretch-bg pixelate full-diagram-cell left-diagram-cell"
        style={{ backgroundImage: `url(${ui.alert})` }}
      ></div>
      <div
        className="stretch-bg pixelate full-diagram-cell right-diagram-cell"
        style={{ backgroundImage: `url(${ui.alert})` }}
      ></div>
      <div
        className="stretch-bg pixelate full-diagram-cell bottom-diagram-cell"
        style={{ backgroundImage: `url(${ui.alert})` }}
      ></div>
    </GridDiagram>
  );
}
