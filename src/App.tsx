import { useEffect, useLayoutEffect, useRef, useState } from 'react';

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
import { usePressedKeys } from './hooks/usePressedKeys';

const adjustmentRequired = (type: string) => type !== 'freehand';

function App() {
  const { width: canvasWidth, height: canvasHeight } = useWindowResize();

  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [elements, setElements, undo, redo] = useHistory<DrawElement[]>([]);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [startPanMousePosition, setStartPanMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [scale, setScale] = useState(1);
  const [scaleOffset, setScaleOffset] = useState({ x: 0, y: 0 });

  const [selectedElement, setSelectedElement] = useState<DrawElement | null>(
    null
  );
  const [action, setAction] = useState<Actions>(Actions.NONE);
  const [tool, setTool] = useState('rectangle');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const pressedKeys = usePressedKeys();

  useLayoutEffect(() => {
    const { context, scaleOffsetX, scaleOffsetY } = renderScene(
      elements,
      selectedElement,
      action,
      panOffset,
      scale
    );
    setContext(context);
    setScaleOffset({ x: scaleOffsetX, y: scaleOffsetY });
  }, [elements, action, selectedElement, panOffset, scale]);

  useEffect(() => {
    const textArea = textAreaRef.current;
    if (action === Actions.WRITING) {
      setTimeout(() => {
        textArea?.focus();
        textArea.value = selectedElement?.text;
      }, 0);
    }
  }, [action, selectedElement]);

  useEffect(() => {
    const panOrZoomFunction = (event: WheelEvent) => {
      if (pressedKeys.has('Meta') || pressedKeys.has('Control')) {
        handleZoom(event.deltaY * -0.01);
      } else {
        setPanOffset((prev) => ({
          x: prev.x - event.deltaX,
          y: prev.y - event.deltaY,
        }));
      }
    };

    window.addEventListener('wheel', panOrZoomFunction);
    return () => {
      window.removeEventListener('wheel', panOrZoomFunction);
    };
  }, [pressedKeys]);

  const getMouseCoordinates = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const clientX =
      (event.clientX - panOffset.x * scale + scaleOffset.x) / scale;
    const clientY =
      (event.clientY - panOffset.y * scale + scaleOffset.y) / scale;
    return { clientX, clientY };
  };

  const updateElement = (
    id: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    type: string,
    options?: any
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

          // showResizingBounds(context, updatedElement, panOffset);
        }
        break;
      case 'freehand':
        arrCopy[id].points = [...arrCopy[id].points, { x: x2, y: y2 }];
        break;

      case 'text': {
        const textWidth = context?.measureText(options.text).width || 0;
        const textHeight = 24;

        arrCopy[id] = {
          ...createElement(id, x1, y1, x1 + textWidth, y1 + textHeight, type),
          text: options.text,
        };
        break;
      }

      default:
        throw new Error(`Type not recognised: ${type}`);
    }
    setElements(arrCopy, true);
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement>
  ): void => {
    if (action === Actions.WRITING) return;

    const { clientX, clientY } = getMouseCoordinates(event);

    // middle click or space bar + click
    if (event.button === 1 || pressedKeys.has(' ')) {
      setAction(Actions.PANNING);
      setStartPanMousePosition({ x: clientX, y: clientY });
      return;
    }

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
          // showResizingBounds(context, element, panOffset);
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

      setAction(tool === 'text' ? Actions.WRITING : Actions.DRAWING);
    }
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { clientX, clientY } = getMouseCoordinates(event);

    if (selectedElement) {
      if (
        selectedElement.type === 'text' &&
        clientX - selectedElement.offsetX === selectedElement.x1 &&
        clientY - selectedElement.offsetY === selectedElement.y1
      ) {
        // editing mode
        setAction(Actions.WRITING);
        return;
      }

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

    if (action === Actions.WRITING) {
      return;
    }

    setAction(Actions.NONE);
    setSelectedElement(null);
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement>
  ): void => {
    const { clientX, clientY } = getMouseCoordinates(event);

    if (action === Actions.PANNING) {
      const deltaX = clientX - startPanMousePosition.x;
      const deltaY = clientY - startPanMousePosition.y;

      setPanOffset({
        x: panOffset.x + deltaX,
        y: panOffset.y + deltaY,
      });
      return;
    }

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
          elementsCopy[selectedElement.id] = {
            ...elementsCopy[selectedElement.id],
            points: newPonts,
          };
          setElements(elementsCopy, true);
        } else {
          const { id, x1, y1, x2, y2, type, offsetX, offsetY } =
            selectedElement as DrawElement;
          const width = x2 - x1;
          const height = y2 - y1;

          const newX = clientX - (offsetX || 0);
          const newY = clientY - (offsetY || 0);
          const options = type === 'text' ? { text: selectedElement.text } : {};

          updateElement(
            id,
            newX,
            newY,
            newX + width,
            newY + height,
            type,
            options
          );
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

  const handleBlur = (
    event: React.FocusEvent<HTMLTextAreaElement, Element>
  ) => {
    const text = event.target.value;
    const { id, x1, y1, type } = selectedElement as DrawElement;
    updateElement(id, x1, y1, 0, 0, type, { text: event.target.value });

    if (text.length > 0) {
      setAction(Actions.NONE);
      setSelectedElement(null);
    }
  };

  const handleZoom = (delta: number) => {
    setScale((prev) => Math.min(Math.max(prev + delta, 0.1), 2));
  };

  return (
    <>
      <Toolbar onChange={(name) => setTool(name)} />

      <div className="p-4 bottom-0 fixed flex gap-2 z-10">
        <button className="custom-btn" onClick={() => handleZoom(-0.1)}>
          -
        </button>
        <button className="custom-btn" onClick={() => setScale(1)}>
          {new Intl.NumberFormat('pt-BR', { style: 'percent' }).format(scale)}
        </button>
        <button className="custom-btn" onClick={() => handleZoom(0.1)}>
          +
        </button>
        <button className="custom-btn" onClick={undo}>
          Undo
        </button>
        <button className="custom-btn" onClick={redo}>
          Redo
        </button>
      </div>

      {action === Actions.WRITING && (
        <textarea
          ref={textAreaRef}
          onBlur={handleBlur}
          onFocus={() => textAreaRef.current?.select()}
          style={{
            position: 'fixed',
            top:
              (selectedElement?.y1 - 5) * scale +
              panOffset.y * scale -
              scaleOffset.y,
            left:
              selectedElement?.x1 * scale + panOffset.x * scale - scaleOffset.x,
            font: `${24 * scale}px sans-serif`,
            margin: 0,
            padding: 0,
            border: 0,
            outline: 0,
            overflow: 'hidden',
            whiteSpace: 'pre',
            background: 'transparent',
          }}
        />
      )}

      <canvas
        id="canvas"
        style={{
          backgroundColor: '#fffce8',
          position: 'absolute',
          zIndex: 1,
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
