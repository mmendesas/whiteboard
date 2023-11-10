import React, { createContext, useContext, useReducer } from 'react';

type BoardContextType = {
  selectedTool: string;
  selectedToolAction: (payload: any) => void;
};

const BoardContext = createContext<BoardContextType | null>(null);

export const useBoard = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error('useBoard must be within BoardProvider');
  }
  return context;
};

type BoardProviderProps = {
  children: React.ReactNode;
};

export const BoardProvider: React.FC<BoardProviderProps> = ({ children }) => {
  const initialState = {
    selectedTool: 'rectangle',
  };

  const [state, dispatch] = useReducer(boardReducer, initialState);

  const selectedToolAction = (payload: unknown) => {
    dispatch({ type: 'selected_tool', payload });
  };

  return (
    <BoardContext.Provider
      value={{
        ...state,
        selectedToolAction,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

interface BoardState {
  selectedTool: string;
}

interface BoardAction {
  type: 'selected_tool';
  payload: any;
}

const boardReducer = (state: BoardState, action: BoardAction) => {
  switch (action.type) {
    case 'selected_tool':
      return {
        ...state,
        selectedTool: action.payload.name,
      };
    default:
      return state;
  }
};
