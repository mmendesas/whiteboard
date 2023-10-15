import rough from 'roughjs';
import { DrawElement } from './type';

const generator = rough.generator();

export const createElement = (x1, y1, x2, y2, type): DrawElement => {
  let roughElement = generator.line(x1, y1, x2, y2);

  switch (type) {
    case 'line':
      roughElement = generator.line(x1, y1, x2, y2);
      break;

    case 'rectangle':
      roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1);
      break;

    default:
      throw new Error(`Element type not supported: ${type}`);
  }

  return { x1, y1, x2, y2, roughElement };
};
