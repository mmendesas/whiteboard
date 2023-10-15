import { useLayoutEffect, useState } from 'react';
import rough from 'roughjs';

import { useWindowResize } from './hooks/useWindowResize';
import { createElement } from './elements/createElement';

const roughGenerator = rough.generator();

function App() {
  const { width: canvasWidth, height: canvasHeight } = useWindowResize();

  const [elements, setElements] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [elementType, setElementType] = useState('line');

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

    const element = createElement(
      clientX,
      clientY,
      clientX,
      clientY,
      elementType
    );
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

    const updatedElement = createElement(x1, y1, clientX, clientY, elementType);

    // update
    const arrCopy = [...elements];
    arrCopy[index] = updatedElement;
    setElements(arrCopy);
  };

  return (
    <>
      <div className="fixed z-10 flex gap-6 p-4">
        <div className="flex gap-2">
          <input
            type="radio"
            id="line"
            checked={elementType === 'line'}
            onChange={() => setElementType('line')}
          />
          <label htmlFor="line">Line</label>
        </div>
        <div className="flex gap-2">
          <input
            type="radio"
            id="rectangle"
            checked={elementType === 'rectangle'}
            onChange={() => setElementType('rectangle')}
          />
          <label htmlFor="rectangle">Rectangle</label>
        </div>
      </div>

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
    </>
  );
}

export default App;
