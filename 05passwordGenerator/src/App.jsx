import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [LengthStr, setLengthStr] = useState(7);
  const [numberAllowed, setNumber] = useState(false);
  const [charAllowed, setChar] = useState(false);
  const [password, setPassword] = useState("");
  const [buttonColor, setButtonColor] = useState("blue");

  // useRef hook with default value null
  const passwordRef = useRef(null);

  /* function handleChar() {
    setChar((prev) => !prev);
  } */

  // useCallback use for memoize and optimize and put data in cache
  const passwordGenerator = useCallback(() => {
    // now its a function
    let passStr = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%^&*-_+=[]{}~`";
    }
    console.log("string value", str);
    for (let i = 1; i <= LengthStr; i++) {
      let getRandomIndex = Math.floor(Math.random() * str.length);
      passStr += str.charAt(getRandomIndex);
    }

    setPassword(passStr);
  }, [LengthStr, numberAllowed, charAllowed, setPassword]); //setPassword is use just for optimization

  // copy to clipcboard using useref hook
  const copyToClipboard = useCallback(() => {
    /// passwordRef will use just to high light the text which needs to copy
    // optionally select if password value is not zero than select
    passwordRef.current?.select();
    // we can select the value with range also
    passwordRef.current?.setSelectionRange(0, 4);
    // in native react window object is availbale while in next.js it is not availbale
    window.navigator.clipboard.writeText(password);

    setButtonColor("green"); // Change to your desired color

    // set time out
    setTimeout(() => {
      setButtonColor("blue");
    }, 2000);
  }, [password]); // it is optimizing on password bcause password change thats why

  useEffect(() => {
    passwordGenerator();
    /*const passwordGenerator = () => {
      let passStr = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      if (numberAllowed) {
        str += "0123456789";
      }
      if (charAllowed) {
        str += "!@#$%^&*-_+=[]{}~`";
      }
      console.log("string value", str);
      for (let i = 1; i <= LengthStr; i++) {
        let getRandomIndex = Math.floor(Math.random() * str.length);
        passStr += str.charAt(getRandomIndex);
      }
      setPassword(passStr);
    };
    passwordGenerator();*/
  }, [LengthStr, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg py-3 px-4 my-10 text-orange-600 font-sans font-extrabold bg-gray-400">
      <h1 className="text-black text-center font-extrabold my-3">
        Password generator
      </h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          id="passwordInput" // Add an id to your input field
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="password"
          readOnly
          ref={passwordRef} // reference of useref hook
        />
        <button
          onClick={copyToClipboard}
          className={`outline-none ${
            buttonColor === "blue" ? "bg-blue-700" : "bg-green-700"
          } text-white px-3 pb-0.5 shrink-0`}
        >
          copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={LengthStr}
            className="cursor-pointer"
            onChange={(e) => {
              setLengthStr(e.target.value);
            }}
          />
          <label>Length: {LengthStr}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumber((prev) => !prev); // it mean reverse the previous value mean false to true
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => {
              setChar((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
