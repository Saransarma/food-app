//SHould start with function key word or arrow function
//Component name should start with capital
//you should have component body (jsx) +component logic
//export that component to use out side

import React, { createContext, useState } from "react";
import "./App.css";
import Homepage from "./pages/homepage";

//create the context
//provide the context
//consume the context


export const ThemeContext = createContext(null)


function App() {

  const [theme,setTheme]=useState(false)

  return (
    <div className="App">
    <Homepage />
  </div>
    
  );
}

export default App;
