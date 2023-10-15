import { useLayoutEffect } from 'react';
import { useWindowResize } from './hooks/useWindowResize';

function App() {
  const { width: canvasWidth, height: canvasHeight } = useWindowResize();

  useLayoutEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    context.fillStyle = 'red';
    context.fillRect(50, 50, 100, 100);
  }, []);

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
