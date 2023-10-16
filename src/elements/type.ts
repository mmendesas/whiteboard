import { Drawable } from 'roughjs/bin/core';

export type Point = {
  x: number;
  y: number;
};

export type Coordinates = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

export type DrawElement = {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  roughElement: Drawable;
  type: string;
  offsetX?: number;
  offsetY?: number;
  position?: string | null;
  points?: Point[];
  xOffsets: number[];
  yOffsets: number[];
};

export enum Actions {
  NONE = 'none',
  DRAWING = 'drawing',
  MOVING = 'moving',
  RESIZING = 'resizing',
}
