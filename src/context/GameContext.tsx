"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface GameContextValue {
  earned: string;
  setEarned: (amount: string) => void;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [earned, setEarnedState] = useState("$0");

  const setEarned = useCallback((amount: string) => {
    setEarnedState(amount);
  }, []);

  return (
    <GameContext.Provider value={{ earned, setEarned }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
}
