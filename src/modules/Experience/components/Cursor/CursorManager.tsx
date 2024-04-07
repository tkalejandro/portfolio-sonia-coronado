// CursorContext.js
import React, { createContext, useState, useContext } from 'react';

// Create a context
const CursorContext = createContext<any>(null);

// Create a provider component
export const CursorManage = ({ children }: any) => {
  const [color, setColor] = useState('rgba(255, 255, 255, 0.8)');

  // Function to update color
  const changeColor = (newColor: React.SetStateAction<string>) => {
    setColor(newColor);
  };

  return (
    <CursorContext.Provider value={{ color, changeColor }}>
      {children}
    </CursorContext.Provider>
  );
};

// Custom hook to use the color context
export const useColor = () => useContext(CursorContext);