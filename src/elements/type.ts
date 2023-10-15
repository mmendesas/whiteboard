import { Drawable } from 'roughjs/bin/core';

export type DrawElement = {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  roughElement: Drawable;
  type: string;
};

export enum Actions {
  NONE = 'none',
  DRAWING = 'drawing',
  MOVING = 'moving',
}
