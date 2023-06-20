import { AttackDiagram } from "../Diagrams/AttackDiagram";
import { BombDiagram } from "../Diagrams/BombDiagram";
import { GetAttackedDiagram } from "../Diagrams/GetAttackedDiagram";
import { MovementDiagram } from "../Diagrams/MovementDiagram";
import { VictoryDiagram } from "../Diagrams/VictoryDiagram";
import { TutorialNavigationString } from "../InfoMain";

type TutorialMainProps = {
  setNavigationString: (str: TutorialNavigationString) => void;
};

export function TutorialMain({ setNavigationString }: TutorialMainProps) {
  return (
    <>
      <div>
        <button onClick={() => setNavigationString("main")}>{"<"}</button>
      </div>
      <div className="info-content">
        <p>You can move one space in any direction.</p>
        <MovementDiagram />
        <p>
          Attack an enemy by moving into their square. All enemies die in one
          hit.
        </p>
        <AttackDiagram />
        <p>
          An enemy attacks you if you are in range at the start of its turn.
          Some enemies are short-range; others are long range.
        </p>
        <GetAttackedDiagram />
        <p>Watch out for other sources of damage, too, like bombs.</p>
        <BombDiagram />
        <p>
          Kill all the enemies to progress to the next region. Use the world map
          to pick a nearby region.
        </p>
        <p>
          The final region is at the north edge of the world map. Beat it to win
          the game.
        </p>
        <VictoryDiagram />
        <p>If you die, you have to start all over. Good luck!</p>
      </div>
    </>
  );
}
