import { Bounds } from '../math';

/**
 * Type representing current context shared by every component.
 */
export type Context = {
  /**
   * The width of the current canvas.
   */
  readonly width: number;

  /**
   * The height of the current canvas.
   */
  readonly height: number;

  /**
   * The bounds of the current canvas.
   */
  readonly bounds: Bounds;

  /**
   * The current rendering context.
   */
  readonly renderingContext: CanvasRenderingContext2D;
};
