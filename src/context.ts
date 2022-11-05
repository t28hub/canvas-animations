import { Bounds } from './bounds';

export interface Context {
  readonly width: number;
  readonly height: number;
  readonly bounds: Bounds;
  readonly renderingContext: CanvasRenderingContext2D;
}
