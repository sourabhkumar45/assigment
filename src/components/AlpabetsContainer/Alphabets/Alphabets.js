import { useDrag } from "react-dnd";

const Alphabets = (props) => {
  const [{ isDragging }, drag] = useDrag({
    type: "alphabet",
    item: {
      payload: props.id,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <div
      className={"alphabet"}
      key={props.id}
      ref={drag}
      style={{ opacity: isDragging ? 0 : 1 }}
    >
      {props.id}
    </div>
  );
};
export default Alphabets;
