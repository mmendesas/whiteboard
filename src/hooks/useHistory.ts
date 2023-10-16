import { useState } from 'react';

export const useHistory = <T>(initialState: T) => {
  const [index, setIndex] = useState(0);
  const [history, setHistory] = useState<T[]>([initialState]);

  const setState = (
    action: React.SetStateAction<unknown>,
    overwrite = false
  ): void => {
    const newState =
      typeof action === 'function' ? action(history[index]) : action;

    if (overwrite) {
      const historyCopy = [...history];
      historyCopy[index] = newState;
      setHistory(historyCopy);
    } else {
      const updatedState = [...history].slice(0, index + 1);
      setHistory((prev) => [...updatedState, newState]);
      setIndex((prev) => prev + 1);
    }
  };

  const undo = () => index > 0 && setIndex((prev) => prev - 1);
  const redo = () => index < history.length - 1 && setIndex((prev) => prev + 1);

  return [history[index], setState, undo, redo] as const;
};
