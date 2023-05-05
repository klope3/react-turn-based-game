import { environment } from "../../data/assetPaths";
import { Cell as CellType } from "../../types/gameStateTypes";

type CellProps = {
  flatIndex: number;
  isSelected: boolean;
  cellData: CellType;
};

export function Cell({ flatIndex, isSelected, cellData }: CellProps) {
  const cellClassName = `cell stretch-bg pixelate`;
  const cellStyle = {
    backgroundImage: `url("${environment.groundRock1}")`,
  };

  const objClassName = `stretch-bg fill-container pixelate ${
    cellData.cellObject !== undefined ? cellData.cellObject.type : ""
  }`;
  const objStyle = {
    backgroundImage: cellData.cellObject
      ? `url("${cellData.cellObject.imagePath}")`
      : undefined,
  };

  return (
    <div className={cellClassName} style={cellStyle} data-cellindex={flatIndex}>
      <div className="cell-frame fill-container no-click"></div>
      {isSelected && (
        <div className="select-frame fill-container no-click"></div>
      )}
      {cellData.cellObject && (
        <div
          className={objClassName}
          style={objStyle}
          data-cellindex={flatIndex}
        ></div>
      )}
    </div>
  );
}
