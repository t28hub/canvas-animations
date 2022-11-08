import { Options } from '../animation';

import { PlayEvent, ResizeEvent, StopEvent } from './events';
import { Player } from './playler';
import PlayerWorker from './worker?worker&inline';

const playerWorker = new PlayerWorker();

export class WorkerPlayer implements Player {
  constructor(private readonly canvas: OffscreenCanvas, private readonly worker: Worker = playerWorker) {}

  play<T extends Options>(options: Partial<T>) {
    const event: PlayEvent<T> = {
      type: 'play',
      payload: {
        canvas: this.canvas,
        options,
      },
    };
    this.worker.postMessage(event, [this.canvas]);
  }

  stop() {
    const event: StopEvent = {
      type: 'stop',
    };
    this.worker.postMessage(event);
  }

  resize(width: number, height: number) {
    const event: ResizeEvent = {
      type: 'resize',
      payload: { width, height },
    };
    this.worker.postMessage(event);
  }
}
