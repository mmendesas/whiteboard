import { BoardProvider } from './context/BoardContext';
import { Board } from './containers/Board';
import { Toolbar } from './components/Toolbar';
import { ToolOptions } from './components/ToolOptions';

const App = () => {
  return (
    <BoardProvider>
      <Toolbar />
      <ToolOptions />
      <Board />
    </BoardProvider>
  );
};

export default App;
