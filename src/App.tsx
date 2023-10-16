import { useLayoutEffect, useState } from 'react';

import { useWindowResize } from './hooks/useWindowResize';
import { createElement } from './elements/createElement';
import { Actions, Coordinates, DrawElement } from './elements/type';
import {
  cursorForPosition,
  getElementAtPosition,
} from './elements/getElementAtPosition';

import { toolbox } from './constants';
import { adjustElementCoordinates } from './elements/adjustElementCoordinates';
import { resizeCoordinates } from './elements/resizeCoordinates';
import { showResizingBounds } from './elements/bounds';
import { renderScene } from './elements/renderScene';
import { useHistory } from './hooks/useHistory';

function App() {
  const { width: canvasWidth, height: canvasHeight } = useWindowResize();

  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [elements, setElements, undo, redo] = useHistory<DrawElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<DrawElement | null>(
    null
  );
  const [action, setAction] = useState<Actions>(Actions.NONE);
  const [tool, setTool] = useState('line');

  useLayoutEffect(() => {
    const { context } = renderScene(elements);
    setContext(context);
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

    showResizingBounds(context, updatedElement);

    // update
    const arrCopy = [...elements];
    arrCopy[id] = updatedElement;
    setElements(arrCopy, true);
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement>
  ): void => {
    const { clientX, clientY } = event;

    if (tool === 'selection') {
      // handle moving
      const element = getElementAtPosition(clientX, clientY, elements);
      if (element) {
        const offsetX = clientX - element.x1;
        const offsetY = clientY - element.y1;

        showResizingBounds(context, element);

        setSelectedElement({ ...element, offsetX, offsetY });

        // update state
        setElements((prev: unknown) => prev);

        if (element.position === 'inside') {
          setAction(Actions.MOVING);
        } else {
          setAction(Actions.RESIZING);
        }
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
      setSelectedElement(element);

      setAction(Actions.DRAWING);
    }
  };

  const handleMouseUp = () => {
    if (selectedElement) {
      const index = selectedElement.id;
      const { id, type } = elements[index];

      if (action === Actions.DRAWING || action === Actions.RESIZING) {
        const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]);

        updateElement(id, x1, y1, x2, y2, type);
      }
    }

    setAction(Actions.NONE);
    setSelectedElement(null);
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement>
  ): void => {
    const { clientX, clientY } = event;

    if (tool === 'selection') {
      const element = getElementAtPosition(clientX, clientY, elements);

      (event.target as HTMLCanvasElement).style.cursor = element
        ? cursorForPosition(element.position)
        : 'default';
    }

    if (action === Actions.DRAWING) {
      const index = elements.length - 1;
      const { x1, y1 } = elements[index];

      updateElement(index, x1, y1, clientX, clientY, tool);
    } else if (action === Actions.MOVING) {
      const { id, x1, y1, x2, y2, type, offsetX, offsetY } =
        selectedElement as DrawElement;
      const width = x2 - x1;
      const height = y2 - y1;

      const newX = clientX - (offsetX || 0);
      const newY = clientY - (offsetY || 0);

      updateElement(id, newX, newY, newX + width, newY + height, type);
    } else if (action === Actions.RESIZING) {
      const { id, type, position, ...coordinates } =
        selectedElement as DrawElement;

      const { x1, y1, x2, y2 } = resizeCoordinates(
        clientX,
        clientY,
        position as string,
        coordinates
      ) as Coordinates;

      updateElement(id, x1, y1, x2, y2, type);
    }
  };

  return (
    <>
      <div className="fixed z-10 flex gap-6 p-4">
        {toolbox.map((item) => (
          <div key={item.name} className="flex gap-2">
            <input
              type="radio"
              id={item.name}
              checked={tool === item.name}
              onChange={() => setTool(item.name)}
            />
            <label htmlFor={item.name}>{item.name}</label>
          </div>
        ))}
      </div>

      <div style={{ position: 'fixed', bottom: 0, padding: 10 }}>
        <button style={{ backgroundColor: '#ccc', padding: 10 }} onClick={undo}>
          Undo
        </button>
        <button
          style={{ backgroundColor: '#ccc', padding: 10, marginLeft: 10 }}
          onClick={redo}
        >
          Redo
        </button>
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
