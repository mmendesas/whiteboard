import { useLayoutEffect, useState } from 'react';

import { useWindowResize } from './hooks/useWindowResize';
import { createElement } from './elements/createElement';
import { Actions, Coordinates, DrawElement } from './elements/type';
import {
  cursorForPosition,
  getElementAtPosition,
} from './elements/getElementAtPosition';

import { adjustElementCoordinates } from './elements/adjustElementCoordinates';
import { resizeCoordinates } from './elements/resizeCoordinates';
import { showResizingBounds } from './elements/bounds';
import { renderScene } from './elements/renderScene';
import { useHistory } from './hooks/useHistory';
import { Toolbar } from './components/Toolbar';

const adjustmentRequired = (type: string) => type !== 'freehand';

function App() {
  const { width: canvasWidth, height: canvasHeight } = useWindowResize();

  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [elements, setElements, undo, redo] = useHistory<DrawElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<DrawElement | null>(
    null
  );
  const [action, setAction] = useState<Actions>(Actions.NONE);
  const [tool, setTool] = useState('rectangle');

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
    const arrCopy = [...elements];

    switch (type) {
      case 'rectangle':
      case 'diamond':
      case 'ellipse':
      case 'line':
        {
          const updatedElement = createElement(id, x1, y1, x2, y2, type);
          arrCopy[id] = updatedElement;

          showResizingBounds(context, updatedElement);
        }
        break;
      case 'freehand':
        arrCopy[id].points = [...arrCopy[id].points, { x: x2, y: y2 }];
        console.log(arrCopy[id].points);
        break;

      default:
        throw new Error(`Type not recognised: ${type}`);
    }
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
        if (element.type === 'freehand') {
          // calculate offset for each point
          const xOffsets = element.points?.map((point) => clientX - point.x);
          const yOffsets = element.points?.map((point) => clientY - point.y);
          setSelectedElement({ ...element, xOffsets, yOffsets });
        } else {
          const offsetX = clientX - element.x1;
          const offsetY = clientY - element.y1;
          showResizingBounds(context, element);
          setSelectedElement({ ...element, offsetX, offsetY });
        }
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

      if (
        (action === Actions.DRAWING || action === Actions.RESIZING) &&
        adjustmentRequired(type)
      ) {
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
      if (selectedElement) {
        if (selectedElement.type === 'freehand') {
          const newPonts = selectedElement.points?.map((_, index) => {
            return {
              x: clientX - selectedElement.xOffsets[index],
              y: clientY - selectedElement.yOffsets[index],
            };
          });

          const elementsCopy = [...elements];
          elementsCopy[selectedElement.id].points = newPonts;
          setElements(elementsCopy, true);
        } else {
          const { id, x1, y1, x2, y2, type, offsetX, offsetY } =
            selectedElement as DrawElement;
          const width = x2 - x1;
          const height = y2 - y1;

          const newX = clientX - (offsetX || 0);
          const newY = clientY - (offsetY || 0);

          updateElement(id, newX, newY, newX + width, newY + height, type);
        }
      }
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
      <Toolbar onChange={(name) => setTool(name)} />

      <div className="p-4 bottom-0 fixed flex gap-2">
        <button className="custom-btn" onClick={undo}>
          Undo
        </button>
        <button className="custom-btn" onClick={redo}>
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
