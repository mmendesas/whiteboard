import { distance } from '../utils/math';
import { DrawElement } from './type';

function isWithinElement(x: number, y: number, element: DrawElement): boolean {
  const { x1, y1, x2, y2, type } = element;

  switch (type) {
    case 'rectangle': {
      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);

      return x >= minX && x <= maxX && y >= minY && y <= maxY;
    }
    case 'line': {
      const a = { x: x1, y: y1 };
      const b = { x: x2, y: y2 };
      const c = { x, y };

      const offset = distance(a, b) - (distance(a, c) + distance(b, c));

      return Math.abs(offset) < 1;
    }
    default:
      return false;
  }
}

export const getElementAtPosition = (
  x: number,
  y: number,
  elements: DrawElement[]
) => {
  return elements.find((element: DrawElement) =>
    isWithinElement(x, y, element)
  );
};
