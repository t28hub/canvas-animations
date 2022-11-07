import { Options } from '../animation';

import { CanvasPlayer } from './canvasPlayer';

declare const self: DedicatedWorkerGlobalScope;

export type MessageType<T extends Options> = {
  readonly canvas: OffscreenCanvas;
  readonly options: Partial<T>;
};

self.onmessage = <T extends Options>(message: MessageEvent<MessageType<T>>) => {
  const { canvas, options } = message.data;
  try {
    const player = new CanvasPlayer(canvas);
    player.play(options);
  } catch (e) {
    console.warn(`Failed to render on OffscreenCanvas(${canvas})`, e);
  }
};
