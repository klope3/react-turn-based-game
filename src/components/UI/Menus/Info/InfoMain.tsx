import { useState } from "react";
import { useApp } from "../../../../AppProvider";
import { TutorialMain } from "./Tutorial/TutorialMain";
import "./InfoMain.css";
import { UnitsMain } from "./Units/UnitsMain";

export type TutorialNavigationString = "main" | "tutorial" | "units";

export function InfoMain() {
  const [navigationString, setNavigationString] = useState(
    "main" as TutorialNavigationString
  );
  const { setShowInfoMenu } = useApp();

  return (
    <div className="window-full">
      {navigationString === "main" && (
        <div className="menu">
          <button onClick={() => setNavigationString("tutorial")}>
            Tutorial
          </button>
          <button onClick={() => setNavigationString("units")}>Units</button>
        </div>
      )}
      {navigationString === "tutorial" && (
        <TutorialMain setNavigationString={setNavigationString} />
      )}
      {navigationString === "units" && (
        <UnitsMain setNavigationString={setNavigationString} />
      )}
      <button onClick={() => setShowInfoMenu(false)} className="window-x">
        X
      </button>
    </div>
  );
}
