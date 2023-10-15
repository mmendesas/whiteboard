import { useLayoutEffect, useState } from 'react';
import rough from 'roughjs';

import { useWindowResize } from './hooks/useWindowResize';
import { createElement } from './elements/createElement';
import { Actions, DrawElement } from './elements/type';
import { getElementAtPosition } from './elements/getElementAtPosition';

function App() {
  const { width: canvasWidth, height: canvasHeight } = useWindowResize();

  const [elements, setElements] = useState<DrawElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<DrawElement | null>(
    null
  );
  const [action, setAction] = useState<Actions>(Actions.NONE);
  const [tool, setTool] = useState('line');

  useLayoutEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    // clear before re-render
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // draw
    const roughCanvas = rough.canvas(canvas);

    elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));
  }, [elements]);

  const updateElement = (
    id: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    type: string
  ) => {
    const updatedElement = createElement(id, x1, y1, x2, y2, type);

    // update
    const arrCopy = [...elements];
    arrCopy[id] = updatedElement;
    setElements(arrCopy);
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement>
  ): void => {
    const { clientX, clientY } = event;

    if (tool === 'selection') {
      // handle moving
      const element = getElementAtPosition(clientX, clientY, elements);
      if (element) {
        setSelectedElement(element);
        setAction(Actions.MOVING);
      }
    } else {
      const id = elements.length;
      const element = createElement(
        id,
        clientX,
        clientY,
        clientX,
        clientY,
        tool
      );
      setElements((prev) => [...prev, element]);

      setAction(Actions.DRAWING);
    }
  };

  const handleMouseUp = () => {
    setAction(Actions.NONE);
    setSelectedElement(null);
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement>
  ): void => {
    const { clientX, clientY } = event;

    if (action === Actions.DRAWING) {
      const index = elements.length - 1;
      const { x1, y1 } = elements[index];

      updateElement(index, x1, y1, clientX, clientY, tool);
    } else if (action === Actions.MOVING) {
      const { id, x1, y1, x2, y2, type } = selectedElement as DrawElement;
      const width = x2 - x1;
      const height = y2 - y1;

      updateElement(
        id,
        clientX,
        clientY,
        clientX + width,
        clientY + height,
        type
      );
    }
  };

  return (
    <>
      <div className="fixed z-10 flex gap-6 p-4">
        <div className="flex gap-2">
          <input
            type="radio"
            id="selection"
            checked={tool === 'selection'}
            onChange={() => setTool('selection')}
          />
          <label htmlFor="selection">Selection</label>
        </div>
        <div className="flex gap-2">
          <input
            type="radio"
            id="line"
            checked={tool === 'line'}
            onChange={() => setTool('line')}
          />
          <label htmlFor="line">Line</label>
        </div>
        <div className="flex gap-2">
          <input
            type="radio"
            id="rectangle"
            checked={tool === 'rectangle'}
            onChange={() => setTool('rectangle')}
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
