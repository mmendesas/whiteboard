import { useWindowResize } from './hooks/useWindowResize';

function App() {
  const { width: canvasWidth, height: canvasHeight } = useWindowResize();

  return (
    <canvas
      id="canvas"
      style={{
        backgroundColor: '#fffce8',
      }}
      width={canvasWidth}
      height={canvasHeight}
    >
      canvas
    </canvas>
  );
}

export default App;
