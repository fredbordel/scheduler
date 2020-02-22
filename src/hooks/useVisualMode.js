import react, { useState } from "react";

/////////////////////////////////////////////////////////
//CUSTOM HOOK THAT OWNS MODE AND HISTORY MANAGEMENT
/////////////////////////////////////////////////////////

export function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([]);

  function transition(newMode, replace = false) {
    if (replace === true) {
      setMode(newMode)
    } else {
      setHistory([...history, mode])
      setMode(newMode)
    }
  }
  function back() {
    const newHistory = history
    if (newHistory.length >= 1) {
      setMode(newHistory.pop())
      setHistory([...newHistory])
    }
  }
  return { mode, transition, back };
};

