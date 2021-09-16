import "./AlpabetsContainer.css";
import "./Alphabets/Alphabets";
import Alphabets from "./Alphabets/Alphabets";

const AlpabetsContainer = (props) => {
  let alpha = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  return (
    <div className="alpha-container">
      {alpha.map((a) => {
        return <Alphabets id={a}></Alphabets>;
      })}
    </div>
  );
};
export default AlpabetsContainer;
