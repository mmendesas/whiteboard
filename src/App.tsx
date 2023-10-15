import { useLayoutEffect } from 'react';
import rough from 'roughjs';

import { useWindowResize } from './hooks/useWindowResize';

const roughGenerator = rough.generator();

function App() {
  const { width: canvasWidth, height: canvasHeight } = useWindowResize();

  useLayoutEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    // draw
    const roughCanvas = rough.canvas(canvas);
    const rectangle = roughGenerator.rectangle(100, 100, 100, 100);

    roughCanvas.draw(rectangle);

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
