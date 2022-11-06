import { CanvasRenderer } from '../canvas';
import { CanvasElement } from '../types';

declare const self: DedicatedWorkerGlobalScope;

export type MessageType = {
  readonly canvas: CanvasElement;
};

self.onmessage = (message: MessageEvent<MessageType>) => {
  const { canvas } = message.data;
  try {
    const renderer = new CanvasRenderer(canvas);
    renderer.render();
  } catch (e) {
    console.warn(`Failed to render on OffscreenCanvas(${canvas})`);
  }
};
