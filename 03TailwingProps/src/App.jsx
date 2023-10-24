import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import myImg from "./assets/up2.png";
import Card from "../components/card";
//import Landing from "../components/Landing";

function App() {
  //const [count, setCount] = useState(0);
  const myObj = {
    name: "Malik hassan",
    age: 37,
  };

  return (
    <>
      <h1 className="bg-gray-500 text-3xl text-black p-4 rounded-lg mb-3">
        Hello World!
      </h1>
      <Card
        imgName="https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXJ8ZW58MHx8MHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60"
        name="Malik"
        detail="Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
          debitis?"
        btnText="CLick me"
      />
      <Card
        // objProp={myObj}
        imgName={myImg}
        name="Hassan"
        detail="Lorem ipsum doasda sit amet asdasdasd dipisicing elit. Excepturi,
          debitis?"
        // btnText="CLick me"
      />
    </>
  );
}

export default App;
