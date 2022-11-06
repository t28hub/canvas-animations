import { CanvasRenderer } from './canvas';
import { Renderer } from './types';
import { WorkerRenderer } from './worker';

export { CanvasRenderer } from './canvas';
export { WorkerRenderer } from './worker';
export { type CanvasElement, type Renderer, type RenderingContext2D } from './types';

/**
 * Create a {@link Renderer} from HTMLCanvasElement.
 *
 * @param canvas The canvas element.
 * @return The {@link Renderer} instance.
 */
export function createRenderer(canvas: HTMLCanvasElement): Renderer {
  if (typeof window.OffscreenCanvas !== 'undefined') {
    return new WorkerRenderer(canvas.transferControlToOffscreen());
  }
  return new CanvasRenderer(canvas);
}
