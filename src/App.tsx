import { useLayoutEffect, useState } from 'react';
import rough from 'roughjs';

import { useWindowResize } from './hooks/useWindowResize';
import { createElement } from './elements/createElement';
import { Actions, DrawElement, UserAction } from './elements/type';

function App() {
  const { width: canvasWidth, height: canvasHeight } = useWindowResize();

  const [elements, setElements] = useState<DrawElement[]>([]);
  const [action, setAction] = useState<Actions>(Actions.NONE);
  const [elementType, setElementType] = useState('line');

  useLayoutEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    // clear before re-render
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // draw
    const roughCanvas = rough.canvas(canvas);

    elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));
  }, [elements]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement>
  ): void => {
    setAction(Actions.DRAWING);

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
    setAction(Actions.NONE);
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement>
  ): void => {
    if (action === Actions.DRAWING) {
      const { clientX, clientY } = event;

      const index = elements.length - 1;
      const { x1, y1 } = elements[index];

      const updatedElement = createElement(
        x1,
        y1,
        clientX,
        clientY,
        elementType
      );

      // update
      const arrCopy = [...elements];
      arrCopy[index] = updatedElement;
      setElements(arrCopy);
    }
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
