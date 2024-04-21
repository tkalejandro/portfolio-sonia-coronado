// CursorContext.js
import React, { createContext, useState, useContext, ReactNode, Children, Context } from 'react';
import { CursorManager } from '@/types/ExperienceTypes';

// Create a context
const CursorContext = createContext<CursorManager | undefined>(undefined);

interface CursorManagerProps {
  children: ReactNode;
}


// Create a provider component
export const CursorManage = ({ children }:CursorManagerProps) => {
  const [color, setColor] = useState('rgba(255, 255, 255, 0.8)');
  const [settings, setSettings] = useState({
    color: 'rgba(255, 255, 255, 0.8)',
    hover: false,
    text: "",
    contact: false,
    secret: false
  })

  // Function to update color
  const changeColor = (newColor: React.SetStateAction<string>):void => {
    setColor(newColor);
  };

  const changeSettings = (newColor: string, newHover: boolean, newText: string, newContact: boolean, newSecret: boolean):void => {
    setSettings({
      color: newColor,
      hover: newHover,
      text: newText,
      contact: newContact,
      secret: newSecret
    })
  }


  return (
    <CursorContext.Provider value={{ color, changeColor, settings, changeSettings }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useSoundManagerContext must be used within a SoundManagerContextProvider');
  }
  return context;
};