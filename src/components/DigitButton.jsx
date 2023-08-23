import ACTIONS from "../constants/ACTIONS";

export default function DigitButton({ dispatch, digit, addClass }) {
  return (
    <button
      className={addClass}
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
}
