import { useState, useEffect } from "react";
import "./App.css";
import { ThemeProvider } from "./contexts/theme";
import ThemeBtn from "./components/themeBtn";
import Card from "./components/card";

function App() {
  const [themeMode, setThemeMode] = useState("light");

  // define method of conrtext here
  function darkTheme() {
    setThemeMode("dark");
  }
  const lightTheme = () => {
    setThemeMode("light");
  };

  // actual change in theme just by JS
  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
      <div className="flex flex-wrap min-h-screen items-center">
        <div className="w-full">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
            {/* theme button */}
            <ThemeBtn />
          </div>

          <div className="w-full max-w-sm mx-auto">
            {/* Card */}
            <Card />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
