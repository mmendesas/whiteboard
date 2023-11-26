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
  type: string,
  toolOptions: { [key: string]: any } = {}
): DrawElement => {
  let roughElement = generator.line(x1, y1, x2, y2);

  const roughOptions = {
    fillWeight: 4, // thicker lines for hachure
    hachureAngle: 60, // angle of hachure,
    hachureGap: 12,
  };

  const options = {
    fill: toolOptions.backgroundColor,
    fillStyle: toolOptions.fillStyle,
    roughness: toolOptions.sloppinessStyle,
    stroke: toolOptions.strokeColor,
    strokeStyle: toolOptions.strokeStyle,
    strokeWidth: toolOptions.strokeWidth,
    ...roughOptions,
  };

  switch (type) {
    case 'line':
      roughElement = generator.line(x1, y1, x2, y2, options);
      break;

    case 'rectangle':
      roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1, options);
      break;

    case 'ellipse': {
      const width = x2 - x1;
      const height = y2 - y1;

      roughElement = generator.ellipse(
        x1 + width / 2,
        y1 + height / 2,
        width,
        height,
        options
      );
      break;
    }

    case 'diamond': {
      const [topX, topY, rightX, rightY, bottomX, bottomY, leftX, leftY] =
        getDiamondPoints({ x1, y1, x2, y2 });

      roughElement = generator.polygon(
        [
          [topX, topY],
          [rightX, rightY],
          [bottomX, bottomY],
          [leftX, leftY],
        ],
        options
      );

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
