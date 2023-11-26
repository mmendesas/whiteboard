import React, { createContext, useContext, useReducer } from 'react';

type BoardContextType = {
  selectedTool: string;
  selectedOptions: { [key: string]: any };
  selectedToolAction: (payload: any) => void;
  selectedOptionsAction: (payload: any) => void;
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
    selectedOptions: {},
  };

  const [state, dispatch] = useReducer(boardReducer, initialState);

  const selectedToolAction = (payload: unknown) => {
    dispatch({ type: 'selected_tool', payload });
  };

  const selectedOptionsAction = (payload: unknown) => {
    dispatch({ type: 'selected_options', payload });
  };

  return (
    <BoardContext.Provider
      value={{
        ...state,
        selectedToolAction,
        selectedOptionsAction,
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
  type: 'selected_tool' | 'selected_options';
  payload: any;
}

const boardReducer = (state: BoardState, action: BoardAction) => {
  switch (action.type) {
    case 'selected_tool':
      return {
        ...state,
        selectedTool: action.payload.name,
      };
    case 'selected_options':
      return {
        ...state,
        selectedOptions: action.payload,
      };
    default:
      return state;
  }
};
