import { Network } from './graphics/network';
import { Renderer } from './graphics/renderer';
import { Bounds } from './math';

export function draw(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d');
  if (!context) {
    throw new TypeError(`Failed to retrieve '2d' context from canvas(${canvas})`);
  }

  context.fillStyle = 'rgba(255, 255, 255, 1.0)';
  context.strokeStyle = 'rgba(255, 255, 255, 1.0)';
  context.globalAlpha = 0.1;
  context.save();

  const bounds = new Bounds({ x: 0, y: 0 }, { x: canvas.width, y: canvas.height });
  const renderer = new Renderer(bounds, Network.random(bounds));
  renderer.render(context);
}
