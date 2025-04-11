import { ReactNode } from "react";

export type Direction = -1 | 1;

export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Boundaries {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export type LayoutProps = {children: ReactNode; }
