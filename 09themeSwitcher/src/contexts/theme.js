import { createContext, useContext } from "react";

// another approch to create contxt with some default values
export const ThemeContext = createContext({
  themeMode: "light", // a veriable like user in miniContext
  darkTheme: () => {}, // a function like setUser
  lightTheme: () => {},
});

// export a provider
export const ThemeProvider = ThemeContext.Provider;

// we can also make a custome hook here
export default function UseTheme() {
  // retrun ur context now we just import this function instead of two different
  // context and contextProvider
  return useContext(ThemeContext);
}
