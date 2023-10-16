import rough from 'roughjs';
import { DrawElement } from './type';

export const renderScene = (elements: DrawElement[]) => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;

  // clear before re-render
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);

  // draw
  const roughCanvas = rough.canvas(canvas);

  elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));

  return { context };
};
