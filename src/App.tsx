import { BoardProvider } from './context/BoardContext';
import { Board } from './containers/Board';

const App = () => {
  return (
    <BoardProvider>
      <Board />
    </BoardProvider>
  );
};

export default App;
