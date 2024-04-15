// CursorContext.js
import React, { createContext, useState, useContext } from 'react';

// Create a context
const CursorContext = createContext<any>(null);

// Create a provider component
export const CursorManage = ({ children }: any) => {
  const [color, setColor] = useState('rgba(255, 255, 255, 0.8)');
  const [hover, setHover] = useState(false);
  const [text, setText] = useState<string>("");
  const [settings, setSettings] = useState<object>({
    color: 'rgba(255, 255, 255, 0.8)',
    hover: false,
    text: "",
    contact: false,
    secret: false
  })

  // Function to update color
  const changeColor = (newColor: React.SetStateAction<string>) => {
    setColor(newColor);
  };

  const changeHover = (newHover: boolean) => {
    
    setHover(newHover)
  };

  const changeText = (newText: string) => {
    setText(newText)
  }

  const changeSettings = (newColor: string, newHover: boolean, newText: string, newContact: boolean, newSecret: boolean) => {
    // document.body.style.cursor = 'none';
    setSettings({
      color: newColor,
      hover: newHover,
      text: newText,
      contact: newContact,
      secret: newSecret
    })
  }


  return (
    <CursorContext.Provider value={{ color, changeColor, hover, changeHover, text, changeText, settings, changeSettings }}>
      {children}
    </CursorContext.Provider>
  );
};

// Custom hook to use the color context
export const useCursor = () => useContext(CursorContext);