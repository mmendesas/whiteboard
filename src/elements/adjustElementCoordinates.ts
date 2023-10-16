import { DrawElement } from './type';

export const adjustElementCoordinates = (element: DrawElement) => {
  const { type, x1, y1, x2, y2 } = element;

  switch (type) {
    case 'rectangle': {
      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);

      return { x1: minX, x2: maxX, y1: minY, y2: maxY };
    }

    case 'line': {
      if (x1 < x2 || (x1 === x2 && y1 < y2)) {
        return { x1, y1, x2, y2 };
      } else {
        return { x1: x2, y1: y2, x2: x1, y2: y1 };
      }
    }

    default:
      return element;
  }
};
