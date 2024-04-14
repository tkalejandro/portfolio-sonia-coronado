// CursorContext.js
import React, { createContext, useState, useContext } from 'react';

// Create a context
const CursorContext = createContext<any>(null);

// Create a provider component
export const CursorManage = ({ children }: any) => {
  const [color, setColor] = useState('rgba(255, 255, 255, 0.8)');
  const [hover, setHover] = useState(false);
  const [text, setText] = useState<boolean>(false);

  // Function to update color
  const changeColor = (newColor: React.SetStateAction<string>) => {
    setColor(newColor);
  };

  const changeHover = (newHover: boolean) => {
    setHover(newHover)
  };

  const changeText = (newText: boolean) => {
    setText(newText)
  }


  return (
    <CursorContext.Provider value={{ color, changeColor, hover, changeHover, text, changeText }}>
      {children}
    </CursorContext.Provider>
  );
};

// Custom hook to use the color context
export const useCursor = () => useContext(CursorContext);