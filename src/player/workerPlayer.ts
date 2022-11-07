import { Options } from '../animation';

import { MessageType } from './player.worker';
import PlayerWorker from './player.worker?worker&inline';
import { Player } from './playler';

export class WorkerPlayer implements Player {
  private readonly worker: Worker;

  constructor(private readonly canvas: OffscreenCanvas) {
    this.worker = new PlayerWorker();
  }

  play<T extends Options>(options: Partial<T>) {
    const message: MessageType<T> = {
      canvas: this.canvas,
      options,
    };
    this.worker.postMessage(message, [this.canvas]);
  }

  stop() {
    this.worker.terminate();
  }
}
