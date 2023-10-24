import { useState } from "react";
import BtnColor from "./components/btnColor";

function App() {
  const [color, setColor] = useState("olive");

  function handleColor(e) {
    console.log(e.target.value);
    setColor(e.target.value);
  }

  return (
    <div className="w-full h-screen" style={{ backgroundColor: color }}>
      <div className="fixed flex flex-wrap justify-center top-12 inset-x-0 px-3 ">
        <div className="flex flex-wrap gap-3 justify-center font-serif text-center px-3 py-2 font-semibold bg-white rounded-lg">
          <BtnColor col="red" colorChange={handleColor} />
          <BtnColor col="yellow" colorChange={handleColor} />
          <BtnColor col="green" colorChange={handleColor} />
          <BtnColor col="blue" colorChange={handleColor} />
          <BtnColor col="black" />
        </div>
      </div>
    </div>
  );
}

export default App;
