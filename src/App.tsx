import { BoardProvider } from './context/BoardContext';
import { Board } from './containers/Board';
import { Toolbar } from './components/Toolbar';
import { Toolprops } from './components/Toolprops';

const App = () => {
  return (
    <BoardProvider>
      <Toolbar />
      <Toolprops />
      <Board />
    </BoardProvider>
  );
};

export default App;
