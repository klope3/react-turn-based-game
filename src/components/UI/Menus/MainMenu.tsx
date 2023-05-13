import { useDispatch } from "react-redux";
import { startPlaying } from "../../../redux/gameActions";
import { useState } from "react";

export function MainMenu() {
  const dispatch = useDispatch();
  const saveExists = localStorage.getItem("save") !== null;
  const [confirmDeleteSave, setConfirmDeleteSave] = useState(false);
  // TODO: "New Game" should open a new screen that allows the user to choose seed, world size, difficulty, etc.
  return (
    <div className="menu">
      {!confirmDeleteSave && (
        <>
          {saveExists && (
            <button onClick={() => dispatch(startPlaying())}>Continue</button>
          )}
          <button
            onClick={() => {
              if (saveExists) {
                setConfirmDeleteSave(true);
              } else {
                dispatch(startPlaying());
              }
            }}
          >
            New Game
          </button>
        </>
      )}
      {confirmDeleteSave && (
        <>
          <div>This will DELETE your existing save. Press "GO" to confirm.</div>
          <button
            onClick={() => {
              localStorage.removeItem("save");
              dispatch(startPlaying());
            }}
          >
            GO
          </button>
          <button onClick={() => setConfirmDeleteSave(false)}>Cancel</button>
        </>
      )}
    </div>
  );
}
