import { Drawable } from 'roughjs/bin/core';

export type DrawElement = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  roughElement: Drawable;
};

export enum Actions {
  NONE = 'none',
  DRAWING = 'drawing',
  SELECTING = 'selecting',
}
