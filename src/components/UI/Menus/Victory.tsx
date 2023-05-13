import { useDispatch } from "react-redux";
import { setMainMenu } from "../../../redux/gameActions";

export function Victory() {
  const dispatch = useDispatch();
  return (
    <>
      <div className="menu">
        <div>Victory</div>
        <button onClick={() => dispatch(setMainMenu())}>Main Menu</button>
      </div>
    </>
  );
}
