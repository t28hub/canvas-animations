import { Renderer } from '../types';

import { MessageType } from './worker';
import RendererWorker from './worker?worker&inline';

export class WorkerRenderer implements Renderer {
  private readonly worker: Worker;

  constructor(private readonly canvas: OffscreenCanvas) {
    this.worker = new RendererWorker();
  }

  render() {
    const message: MessageType = { canvas: this.canvas };
    this.worker.postMessage(message, [this.canvas]);
  }

  cancel() {
    this.worker.terminate();
  }
}
