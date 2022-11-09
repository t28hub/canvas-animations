import { CanvasPlayer } from '../canvasPlayer';
import { Event } from '../events';

import { Registry } from './registry';

/**
 * Declare the property of the {@link WorkerGlobalScope} for TypeScript
 *
 * @see [WorkerGlobalScope.self](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/self)
 */
declare const self: DedicatedWorkerGlobalScope;

const registry = new Registry();

self.addEventListener('message', (message: MessageEvent<Event>) => {
  const event = message.data;
  switch (event.type) {
    case 'load': {
      const { id, canvas } = event.payload;
      try {
        const player = new CanvasPlayer(canvas);
        registry.register(id, player);
      } catch (e) {
        console.warn(`Failed to render on OffscreenCanvas(${canvas})`, e);
      }
      break;
    }
    case 'play': {
      const { id, options } = event.payload;
      const player = registry.findByID(id);
      player.play(options);
      break;
    }
    case 'stop': {
      const { id } = event.payload;
      const player = registry.findByID(id);
      player.stop();
      registry.delete(id);
      break;
    }
    case 'resize': {
      const { id, width, height } = event.payload;
      const player = registry.findByID(id);
      player.resize(width, height);
      break;
    }
    default: {
      throw new TypeError(`Unrecognized type of event is declared in ${event}`);
    }
  }
});
