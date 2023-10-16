import rough from 'roughjs';
import { DrawElement } from './type';
import { getDiamondPoints } from './bounds';

const generator = rough.generator();

export const createElement = (
  id: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  type: string
): DrawElement => {
  let roughElement = generator.line(x1, y1, x2, y2);

  switch (type) {
    case 'line':
      roughElement = generator.line(x1, y1, x2, y2);
      break;

    case 'rectangle':
      roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1);
      break;

    case 'ellipse': {
      const width = x2 - x1;
      const height = y2 - y1;

      roughElement = generator.ellipse(
        x1 + width / 2,
        y1 + height / 2,
        width,
        height
      );
      break;
    }

    case 'diamond': {
      const [topX, topY, rightX, rightY, bottomX, bottomY, leftX, leftY] =
        getDiamondPoints({ x1, y1, x2, y2 });

      roughElement = generator.polygon([
        [topX, topY],
        [rightX, rightY],
        [bottomX, bottomY],
        [leftX, leftY],
      ]);

      break;
    }

    case 'freehand': {
      return { id, type, points: [{ x: x1, y: y1 }] };
    }

    case 'text':
      return { id, type, x1, y1, x2, y2, text: '' };

    default:
      throw new Error(`Element type not supported: ${type}`);
  }

  return { id, x1, y1, x2, y2, roughElement, type };
};
