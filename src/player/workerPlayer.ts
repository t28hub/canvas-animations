import { Options } from '../animation';
import { id, ID } from '../utils';

import { LoadEvent, PlayEvent, ResizeEvent, StopEvent } from './events';
import { Player } from './playler';
import PlayerWorker from './worker?worker&inline';

const playerWorker = new PlayerWorker();

export class WorkerPlayer implements Player {
  private readonly id: ID;

  constructor(private readonly canvas: OffscreenCanvas, private readonly worker: Worker = playerWorker) {
    this.id = id();
    const event: LoadEvent = {
      type: 'load',
      payload: {
        id: this.id,
        canvas: this.canvas,
      },
    };
    this.worker.postMessage(event, [this.canvas]);
  }

  play<T extends Options>(options: Partial<T>) {
    const event: PlayEvent<T> = {
      type: 'play',
      payload: {
        id: this.id,
        options,
      },
    };
    this.worker.postMessage(event);
  }

  stop() {
    const event: StopEvent = {
      type: 'stop',
      payload: {
        id: this.id,
      },
    };
    this.worker.postMessage(event);
  }

  resize(width: number, height: number) {
    const event: ResizeEvent = {
      type: 'resize',
      payload: {
        id: this.id,
        width,
        height,
      },
    };
    this.worker.postMessage(event);
  }
}
