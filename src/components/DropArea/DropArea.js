import { useDrop } from "react-dnd";
import { useState, useEffect } from "react";
import "./DropArea.css";

let ele = "";
let sym = "";
let val = "";
const DropArea = () => {
  const [data, setData] = useState([]);
  useEffect(() => {}, [data]);
  const fetchData = async () => {
    if (ele === "" || sym === "" || val === "") {
      alert("Data incomplete");
      return;
    }

    console.log(ele, sym, val);
    let d = await fetch(
      `https://assigment44.herokuapp.com/getData?letter=${ele}&value=${val}&symbol=${sym}`
    ).then((res) => res.json());
    if (d.length === 0) {
      alert("No record");
      return;
    }
    setData(d);
  };
  let arr = ["alphabet", "symbol", "number"];
  return (
    <>
      <div className="drop-area">
        {arr.map((a) => {
          return <SmallDivs sign={a} type={a}></SmallDivs>;
        })}
      </div>
      <div className="result-div">
        <button
          className="submit-btn"
          onClick={() => {
            fetchData();
          }}
        >
          Submit
        </button>
        <table>
          <tr>
            <th>id</th>
            <th>Element</th>
            <th>Value</th>
          </tr>
          {data.map((d) => {
            return (
              <tr>
                <td>{d._id}</td>
                <td>{d.letter}</td>
                <td>{d.value}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};
const SmallDivs = (props) => {
  const [{ isOver }, drop] = useDrop({
    accept: props.sign === "symbol" ? "symbols" : props.sign,
    drop: (item, monitor) => {
      let div;

      if (item.payload === ">" || item.payload === "<") {
        sym = item.payload;
        div = document.querySelectorAll(".symbol")[0];
      } else if (item.payload >= "A" && item.payload <= "Z") {
        ele = item.payload;
        div = document.querySelectorAll(".alphabet")[26];
      } else {
        val = item.payload;
        div = document.querySelector(".number");
      }

      div.innerHTML = item.payload;

      div.style.color = "white";
      div.style.backgroundColor = "rgb(235, 53, 83)";
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  return <div className={"div " + props.type} ref={drop}></div>;
};
export default DropArea;
