import { useDrag } from "react-dnd";
import { useState } from "react";
import "./Symbol.css";

const Symbol = () => {
  return (
    <div className="symbol-container">
      <Sign sign=">"></Sign>
      <Sign sign="<"></Sign>
      <Number sign="0"></Number>
    </div>
  );
};

const Sign = (props) => {
  const [{ isDragging }, drag] = useDrag({
    type: "symbols",
    item: {
      payload: props.sign,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  if (props.sign === "0") {
  }
  return (
    <div className="symbols" style={{ opacity: isDragging ? 0 : 1 }} ref={drag}>
      {props.sign}
    </div>
  );
};
const Number = (props) => {
  const [x, setX] = useState("0");

  const [{ isDragging }, drag] = useDrag({
    type: "number",
    item: {
      payload: x,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <div className="symbols" style={{ opacity: isDragging ? 0 : 1 }} ref={drag}>
      <input
        type="number"
        onChange={(e) => setX(e.target.value)}
        value={x}
      ></input>
    </div>
  );
};
export default Symbol;
