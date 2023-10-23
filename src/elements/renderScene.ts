import rough from 'roughjs';
import getStroke from 'perfect-freehand';
import { RoughCanvas } from 'roughjs/bin/canvas';
import { Drawable } from 'roughjs/bin/core';

import { Actions, DrawElement, Point } from './type';
import { getSvgPathFromStroke } from '../utils/freehand';

const drawElement = (
  roughCanvas: RoughCanvas,
  context: CanvasRenderingContext2D,
  element: DrawElement
) => {
  switch (element.type) {
    case 'rectangle':
    case 'diamond':
    case 'ellipse':
    case 'line':
      roughCanvas.draw(element.roughElement as Drawable);
      break;
    case 'freehand': {
      const stroke = getSvgPathFromStroke(getStroke(element.points as Point[]));

      context.fillStyle = '#555';
      context.fill(new Path2D(stroke));
      break;
    }
    case 'text':
      context.font = '24px sans-serif';
      context.textBaseline = 'top';
      context.fillStyle = '#555';
      context.fillText(element.text, element.x1, element.y1);
      break;

    default:
      throw new Error(`Element type not supported: ${element.type}`);
  }
};

export const renderScene = (
  elements: DrawElement[],
  selectedElement,
  action,
  panOffset
) => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;

  // clear before re-render
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);

  context.save();
  context.translate(panOffset.x, panOffset.y);

  // draw
  const roughCanvas = rough.canvas(canvas);

  elements.forEach((element) => {
    if (action === Actions.WRITING && selectedElement.id === element.id) return;
    drawElement(roughCanvas, context, element);
  });

  context.restore();

  return { context };
};
