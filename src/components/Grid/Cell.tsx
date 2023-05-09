import { environment } from "../../data/assetPaths";
import { Cell as CellType } from "../../types/gameStateTypes";

type CellProps = {
  flatIndex: number;
  isSelected: boolean;
  cellData: CellType;
};

export function Cell({
  flatIndex,
  isSelected,
  cellData: { cellObject },
}: CellProps) {
  const cellClassName = `cell stretch-bg pixelate`;
  const cellStyle = {
    backgroundImage: `url("${environment.groundRock1}")`,
  };

  const objClassName = `stretch-bg fill-container pixelate ${
    cellObject !== undefined ? cellObject.type : ""
  }`;
  const objStyle = {
    backgroundImage: cellObject ? `url("${cellObject.imagePath}")` : undefined,
  };

  return (
    <div className={cellClassName} style={cellStyle} data-cellindex={flatIndex}>
      <div className="cell-frame fill-container no-click"></div>
      {isSelected && (
        <div className="select-frame fill-container no-click"></div>
      )}
      {cellObject && cellObject.displayedByCell && (
        <div
          className={objClassName}
          style={objStyle}
          data-cellindex={flatIndex}
        ></div>
      )}
    </div>
  );
}
