import React from "react";

//colorChange = () =>{}
function BtnColor({ col, colorChange }) {
  // pass the value of event to parent
  /* function handleClick(e) {
    if (colorChange) {
      colorChange(e);
    } else {
      //console.log("Default message or behavior");
      e.target.style.backgroundColor = "gray";
      e.target.textContent = "default";
      alert("this button do not have specified color");
    }
  }*/

  // if color not provided
  function defaultColorChange(e) {
    const defaultColor = "gray";

    e.target.style.backgroundColor = defaultColor;
    e.target.textContent = "Default ❌";
  }

  // Use the provided colorChange function or the default one if not provided
  const handleClick = colorChange || defaultColorChange;

  return (
    <button
      className="outline-none px-5 py-2 rounded-full text-white  shadow-lg "
      style={{ backgroundColor: col }}
      value={col}
      onClick={(e) => handleClick(e)}
    >
      {col}
    </button>
  );
}

export default BtnColor;
