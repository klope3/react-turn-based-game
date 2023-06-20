import { useState } from "react";
import { characterData } from "../../../../../data/characters";
import { TutorialNavigationString } from "../InfoMain";
import "./UnitsMain.css";
import { EnemyData } from "../../../../../types/gameStateTypes";
import { UnitDataDisplay } from "./UnitDataDisplay";

type UnitsMainProps = {
  setNavigationString: (str: TutorialNavigationString) => void;
};

export function UnitsMain({ setNavigationString }: UnitsMainProps) {
  const [unitToDisplay, setUnitToDisplay] = useState(null as EnemyData | null);
  const unitsToShow = characterData.filter((data) => data.type !== "none");

  return (
    <>
      <div>
        <button onClick={() => setNavigationString("main")}>{"<"}</button>
      </div>
      <div
        className="info-content unit-cards-parent"
        style={{ overflow: "hidden" }}
      >
        {unitsToShow.map((characterData, i) => (
          <div
            key={i}
            className="unit-card stretch-bg pixelate"
            style={{ backgroundImage: `url(${characterData.imagePath})` }}
            onClick={() => setUnitToDisplay(characterData)}
          ></div>
        ))}
      </div>
      {unitToDisplay && (
        <UnitDataDisplay
          unitData={unitToDisplay}
          setUnitToDisplay={setUnitToDisplay}
        />
      )}
    </>
  );
}
