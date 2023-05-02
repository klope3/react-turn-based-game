import { Cell as CellType } from "../../types/gameStateTypes";

type CellProps = {
  flatIndex: number;
  isSelected: boolean;
  cellData: CellType;
};

export function Cell({ flatIndex, isSelected, cellData }: CellProps) {
  return (
    <div
      className={`cell ${isSelected ? "selected" : ""}`}
      data-cellindex={flatIndex}
    >
      <div
        className={
          cellData.cellObject !== undefined ? cellData.cellObject.type : ""
        }
        data-cellindex={flatIndex}
      ></div>
    </div>
  );
}
