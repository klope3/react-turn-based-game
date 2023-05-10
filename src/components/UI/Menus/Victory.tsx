import { useDispatch } from "react-redux";
import { setMainMenu } from "../../../redux/gameActions";

export function Victory() {
  const dispatch = useDispatch();
  return (
    <>
      <div>Victory</div>
      <div className="menu">
        <button onClick={() => dispatch(setMainMenu())}>Main Menu</button>
      </div>
    </>
  );
}
