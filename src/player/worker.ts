import { CanvasPlayer } from './canvasPlayer';
import { Event } from './events';
import { NullPlayer } from './nullPlayer';
import { Player } from './playler';

/**
 * Declare the property of the {@link WorkerGlobalScope} for TypeScript
 *
 * @see [WorkerGlobalScope.self](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/self)
 */
declare const self: DedicatedWorkerGlobalScope;

let cache: Player = NullPlayer;

self.addEventListener('message', (message: MessageEvent<Event>) => {
  const event = message.data;
  switch (event.type) {
    case 'play': {
      const { canvas, options } = event.payload;
      try {
        cache = new CanvasPlayer(canvas);
        cache.play(options);
      } catch (e) {
        console.warn(`Failed to render on OffscreenCanvas(${canvas})`, e);
      }
      break;
    }
    case 'stop': {
      cache.stop();
      cache = NullPlayer;
      break;
    }
    case 'resize': {
      const { width, height } = event.payload;
      cache.resize(width, height);
      break;
    }
    default:
      throw new TypeError(`Unrecognized type of event is declared in ${event}`);
  }
});
