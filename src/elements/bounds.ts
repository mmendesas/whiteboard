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
