import { EnemyData } from "../../../../../types/gameStateTypes";

type UnitDataDisplayProps = {
  unitData: EnemyData;
  setUnitToDisplay: (unit: EnemyData | null) => void;
};

export function UnitDataDisplay({
  unitData,
  setUnitToDisplay,
}: UnitDataDisplayProps) {
  return (
    <>
      <div className="input-blocker"></div>
      <div className="unit-data-display">
        <div className="unit-data-display-top-section">
          <div>
            <h3>{unitData.displayName}</h3>
            <div>Attack Range: {unitData.attackRange}</div>
            <div>
              Attack Type:{" "}
              <span style={{ textTransform: "capitalize" }}>
                {unitData.attackType}
              </span>
            </div>
          </div>
          <div
            className="stretch-bg pixelate"
            style={{
              width: `${24 * 4}px`,
              height: `${24 * 4}px`,
              backgroundImage: `url(${unitData.imagePath})`,
            }}
          ></div>
        </div>
        <div className="unit-data-description">{unitData.description}</div>
        <button onClick={() => setUnitToDisplay(null)} className="window-x">
          X
        </button>
      </div>
    </>
  );
}
