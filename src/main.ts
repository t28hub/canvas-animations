import { CanvasPlayer, Player, WorkerPlayer } from './player';
import { isUndefined } from './utils/guards';

/**
 * Create a {@link Player} instance from a canvas element.
 *
 * @param canvas The canvas element.
 * @return The optimal player instance.
 */
export function create(canvas: HTMLCanvasElement): Player {
  if (isUndefined(window)) {
    throw new Error('This function does not run on the server');
  }
  if (isUndefined(window.OffscreenCanvas)) {
    return new CanvasPlayer(canvas);
  }
  return new WorkerPlayer(canvas.transferControlToOffscreen());
}
