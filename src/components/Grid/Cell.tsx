import { clickCell } from "../../redux/gameActions";

type CellProps = {
  flatIndex: number;
  isSelected: boolean;
};

export function Cell({ flatIndex, isSelected }: CellProps) {
  return (
    <div
      className={`cell ${isSelected && "selected"}`}
      data-cellindex={flatIndex}
    ></div>
  );
}
