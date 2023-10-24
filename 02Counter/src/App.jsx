import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  //let counter = 0;
  const [counterValue, setValue] = useState(0);
  function addValue() {
    //console.log("add: ", Math.floor(Math.random() * 6));
    if (counterValue === 20) {
      alert("can't wxceed more than 20");
    } else {
      setValue(counterValue + 1);
    }
  }
  function removeValue() {
    if (counterValue > 0) {
      setValue(counterValue - 1);
    } else {
      alert("counter is less than 0");
    }
  }
  return (
    <>
      <h1>Chai aur Code</h1>
      <h2>counter value: {counterValue}</h2>
      <button onClick={addValue}>Add Value {counterValue}</button>
      <button onClick={removeValue}>remove value {counterValue}</button>
    </>
  );
}

export default App;
