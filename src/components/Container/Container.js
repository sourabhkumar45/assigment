import "./Container.css";
import AlpabetsContainer from "../AlpabetsContainer/AlpabetsContainer";
import Symbol from "../Symbol/Symbol";
import DropArea from "../DropArea/DropArea";
const Container = () => {
  return (
    <>
      <div className="main-container">
        <AlpabetsContainer item="alpha"></AlpabetsContainer>
        <Symbol></Symbol>
        <DropArea></DropArea>
      </div>
    </>
  );
};
export default Container;
