import { Network } from './graphics/network';
import { Renderer } from './graphics/renderer';
import { Bounds } from './math';

export function draw(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d');
  if (!context) {
    throw new TypeError(`Failed to retrieve '2d' context from canvas(${canvas})`);
  }

  context.globalAlpha = 0.2;
  const bounds = new Bounds({ x: 0, y: 0 }, { x: canvas.width, y: canvas.height });
  const renderer = new Renderer(bounds, Network.random(bounds));
  renderer.render(context);
}
