export type CanvasElement = HTMLCanvasElement | OffscreenCanvas;

export type RenderingContext2D = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;

export interface RenderingContext {
  readonly width: number;
  readonly height: number;
  readonly context: RenderingContext2D;
}

export interface Renderer {
  render(): void;

  cancel(): void;
}
