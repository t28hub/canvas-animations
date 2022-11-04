import { Renderer } from './renderer';

export function draw(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d');
  if (!context) {
    throw new TypeError(`Failed to retrieve '2d' context from canvas(${canvas})`);
  }

  const { width, height } = canvas;
  const renderer = new Renderer(width, height);
  renderer.start(context);
}