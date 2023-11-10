import { BoardProvider } from './context/BoardContext';
import { Board } from './containers/Board';
import { Toolbar } from './components/Toolbar';

const App = () => {
  return (
    <BoardProvider>
      <Toolbar />
      <Board />
    </BoardProvider>
  );
};

export default App;
