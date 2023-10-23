import { DrawElement } from './type';

export const getDiamondPoints = (element: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}) => {
  const width = element.x2 - element.x1;
  const height = element.y2 - element.y1;

  const topX = Math.floor(element.x1 + width / 2) + 1;
  const topY = element.y1;
  const rightX = element.x1 + width;
  const rightY = Math.floor(element.y1 + height / 2) + 1;
  const bottomX = topX;
  const bottomY = element.y1 + height;
  const leftX = element.x1;
  const leftY = rightY;

  return [topX, topY, rightX, rightY, bottomX, bottomY, leftX, leftY];
};

export const showResizingBounds = (
  context: CanvasRenderingContext2D | null,
  element: DrawElement,
  offset
): void => {
  if (!element || !context) return;

  context.save();
  context.strokeStyle = 'red';
  context.lineWidth = 1;

  const x1 = element.x1 + offset.x;
  const y1 = element.y1 + offset.y;
  const x2 = element.x2 + offset.x;

  context.strokeRect(
    x1 - 5,
    y1 - 5,
    element.x2 - element.x1 + 10,
    element.y2 - element.y1 + 10
  );

  // add corner dots
  context.fillStyle = '#eee';

  context.strokeStyle = '#000';
  context.lineWidth = 1;
  context.fillRect(x1 - 10, element.y1 - 10, 10, 10);
  context.strokeRect(x1 - 10, element.y1 - 10, 10, 10);

  context.fillRect(x1 - 10, element.y2, 10, 10);
  context.strokeRect(x1 - 10, element.y2, 10, 10);

  context.fillRect(x2, y1 - 10, 10, 10);
  context.strokeRect(x2, y1 - 10, 10, 10);

  context.fillRect(x2, element.y2, 10, 10);
  context.strokeRect(x2, element.y2, 10, 10);
};
