import { Bounds } from './math/bounds';

export interface Context {
  readonly width: number;
  readonly height: number;
  readonly bounds: Bounds;
  readonly renderingContext: CanvasRenderingContext2D;
}
