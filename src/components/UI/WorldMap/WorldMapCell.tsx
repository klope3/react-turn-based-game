import { characters, ui } from "../../../data/assetPaths";

type WorldMapCellProps = {
  isSelected: boolean;
  wasVisited: boolean;
  canBeVisited: boolean;
  flatIndex: number;
  playerHere: boolean;
};

export function WorldMapCell({
  isSelected,
  flatIndex,
  wasVisited,
  canBeVisited,
  playerHere,
}: WorldMapCellProps) {
  const playerImgStyle = {
    backgroundImage: `url(${characters.player})`,
  };
  const visitedImgStyle = {
    backgroundImage: `url(${ui.visited})`,
  };
  const canBeVisitedImgStyle = {
    backgroundImage: `url(${ui.visitable})`,
  };
  const overlayClass = "fill-container stretch-bg pixelate no-click";

  return (
    <div className="world-map-cell" data-cellindex={flatIndex}>
      <div className="cell-frame fill-container no-click"></div>
      {isSelected && (
        <div className="select-frame fill-container no-click"></div>
      )}
      {playerHere && (
        <div className={overlayClass} style={playerImgStyle}></div>
      )}
      {wasVisited && (
        <div className={overlayClass} style={visitedImgStyle}></div>
      )}
      {canBeVisited && (
        <div className={overlayClass} style={canBeVisitedImgStyle}></div>
      )}
    </div>
  );
}
