import { useLayoutEffect, useState } from 'react';
import rough from 'roughjs';

import { useWindowResize } from './hooks/useWindowResize';
import { createElement } from './elements/createElement';

const roughGenerator = rough.generator();

function App() {
  const { width: canvasWidth, height: canvasHeight } = useWindowResize();

  const [elements, setElements] = useState([]);
  const [drawing, setDrawing] = useState(false);

  useLayoutEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    // clear before re-render
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // draw
    const roughCanvas = rough.canvas(canvas);
    const rectangle = roughGenerator.rectangle(100, 100, 100, 100);

    elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));

    roughCanvas.draw(rectangle);

    context.fillStyle = 'red';
    context.fillRect(50, 50, 100, 100);
  }, [elements]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement>
  ): void => {
    setDrawing(true);

    const { clientX, clientY } = event;

    const element = createElement(clientX, clientY, clientX, clientY);
    setElements((prev) => [...prev, element]);
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement>
  ): void => {
    if (!drawing) return;

    const { clientX, clientY } = event;

    const index = elements.length - 1;
    const { x1, y1 } = elements[index];

    const updatedElement = createElement(x1, y1, clientX, clientY);

    // update
    const arrCopy = [...elements];
    arrCopy[index] = updatedElement;
    setElements(arrCopy);
  };

  return (
    <canvas
      id="canvas"
      style={{
        backgroundColor: '#fffce8',
      }}
      width={canvasWidth}
      height={canvasHeight}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      canvas
    </canvas>
  );
}

export default App;
