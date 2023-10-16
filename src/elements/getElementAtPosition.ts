import { distance } from '../utils/math';
import { DrawElement } from './type';

const insideLine = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x: number,
  y: number,
  maxDistance: number = 1
) => {
  const a = { x: x1, y: y1 };
  const b = { x: x2, y: y2 };
  const c = { x, y };
  const offset = distance(a, b) - (distance(a, c) + distance(b, c));

  return Math.abs(offset) < maxDistance ? 'inside' : null;
};

function positionWithinElement(
  x: number,
  y: number,
  element: DrawElement
): string | null {
  const { x1, y1, x2, y2, type } = element;

  switch (type) {
    case 'rectangle':
    case 'diamond':
    case 'ellipse': {
      const topLeft = nearPoint(x, y, x1, y1, 'tl');
      const topRight = nearPoint(x, y, x2, y1, 'tr');
      const bottomLeft = nearPoint(x, y, x1, y2, 'bl');
      const bottomRight = nearPoint(x, y, x2, y2, 'br');

      const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? 'inside' : null;

      return topLeft || topRight || bottomLeft || bottomRight || inside;
    }
    case 'line': {
      const start = nearPoint(x, y, x1, y1, 'start');
      const end = nearPoint(x, y, x2, y2, 'end');
      const inside = insideLine(x1, y1, x2, y2, x, y);

      return start || end || inside;
    }
    case 'freehand': {
      const betweenAnyPoint = element.points?.some((point, index) => {
        const nextPoint = element.points ? element.points[index + 1] : null;
        if (!nextPoint) return false;

        return (
          insideLine(point.x, point.y, nextPoint.x, nextPoint.y, x, y, 5) !==
          null
        );
      });

      return betweenAnyPoint ? 'inside' : null;
    }

    case 'text':
      return x >= x1 && x <= x2 && y >= y1 && y <= y2 ? 'inside' : null;

    default:
      return null;
  }
}

export const getElementAtPosition = (
  x: number,
  y: number,
  elements: DrawElement[]
) => {
  return elements
    .map((element: DrawElement) => ({
      ...element,
      position: positionWithinElement(x, y, element),
    }))
    .find((element: DrawElement) => element.position !== null);
};

const nearPoint = (
  x: number,
  y: number,
  x1: number,
  y1: number,
  name: string
): string | null => {
  return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? name : null;
};

export const cursorForPosition = (position: string | null) => {
  switch (position) {
    case 'tl':
    case 'br':
    case 'start':
    case 'end':
      return 'nwse-resize';
    case 'tr':
    case 'bl':
      return 'nesw-resize';
    default:
      return 'move';
  }
};
