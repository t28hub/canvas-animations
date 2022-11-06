import { CanvasRenderer, Renderer, WorkerRenderer } from './graphics';
import { isUndefined } from './utils/guards';

/**
 * Create a {@link Renderer} instance from a canvas element.
 *
 * @param canvas The canvas element.
 * @return The optimal renderer instance.
 */
export function create(canvas: HTMLCanvasElement): Renderer {
  if (isUndefined(window)) {
    throw new Error('This function does not run on the server');
  }
  if (isUndefined(window.OffscreenCanvas)) {
    return new CanvasRenderer(canvas);
  }
  return new WorkerRenderer(canvas.transferControlToOffscreen());
}
