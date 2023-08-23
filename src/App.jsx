import "/styles.css";
import { useEffect, useReducer } from "react";
import DigitButton from "./components/DigitButton";
import OperationButton from "./components/OperationButton";
import ACTIONS from "./constants/ACTIONS";
import reducer from "./functions/reducer";
import formatOperand from "./functions/formatOperand";

function App() {
  const [{ currentOperand = "0", previousOperand, operation }, dispatch] =
    useReducer(reducer, {});

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;

      if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(key)) {
        dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: key } });
      } else if (key === ".") {
        dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: "." } });
      } else if (["+", "-", "*", "/"].includes(key)) {
        dispatch({
          type: ACTIONS.CHOOSE_OPERATION,
          payload: { operation: key === "/" ? "÷" : key },
        });
      } else if (key === "Enter") {
        dispatch({ type: ACTIONS.EVALUATE });
      } else if (["Delete", "Clear"].includes(key)) {
        dispatch({ type: ACTIONS.CLEAR });
      } else if (key === "Backspace") {
        dispatch({ type: ACTIONS.DELETE_DIGIT });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  return (
    <div className="container-div">
      <div className="calculator-grid">
        <div className="output">
          <div className="previous-operand">
            {formatOperand(previousOperand)} {operation}
          </div>
          <div className="current-operand">{formatOperand(currentOperand)}</div>
        </div>
        <button
          className="span-two"
          onClick={() => dispatch({ type: ACTIONS.CLEAR })}
        >
          AC
        </button>
        <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
          DEL
        </button>
        <OperationButton operation="÷" dispatch={dispatch} />
        <DigitButton digit="1" dispatch={dispatch} />
        <DigitButton digit="2" dispatch={dispatch} />
        <DigitButton digit="3" dispatch={dispatch} />
        <OperationButton operation="*" dispatch={dispatch} />
        <DigitButton digit="4" dispatch={dispatch} />
        <DigitButton digit="5" dispatch={dispatch} />
        <DigitButton digit="6" dispatch={dispatch} />
        <OperationButton operation="+" dispatch={dispatch} />
        <DigitButton digit="7" dispatch={dispatch} />
        <DigitButton digit="8" dispatch={dispatch} />
        <DigitButton digit="9" dispatch={dispatch} />
        <OperationButton operation="-" dispatch={dispatch} />
        <DigitButton addClass="bottom-left" digit="." dispatch={dispatch} />
        <DigitButton digit="0" dispatch={dispatch} />
        <button
          className="span-two bottom-right"
          onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
        >
          =
        </button>
      </div>
    </div>
  );
}

export default App;
