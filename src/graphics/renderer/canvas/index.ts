import { Bounds } from '../../../math';
import { Drawable, DrawableContext } from '../../drawable';
import { Network } from '../../network';
import { Options } from '../../options';
import { CanvasElement, Renderer, RenderingContext2D } from '../types';

const NO_ANIMATION_ID = -1;

/**
 * Types rendering drawable components to the given rendering context.
 */
export class CanvasRenderer implements Renderer {
  private readonly bounds: Bounds;
  private readonly context: RenderingContext2D;
  private readonly options: Options;
  private readonly drawable: Drawable;
  private animationId: number;

  constructor(canvas: CanvasElement | OffscreenCanvas) {
    this.bounds = new Bounds({ x: 0, y: 0 }, { x: canvas.width, y: canvas.height });
    this.context = CanvasRenderer.ensureContext2D(canvas);
    this.options = { amount: 1000, radius: 2, speed: 1.0 };
    this.drawable = Network.initialize(this.bounds, this.options);
    this.animationId = NO_ANIMATION_ID;
  }

  render() {
    const context: DrawableContext = { bounds: this.bounds, options: this.options, context: this.context };
    this.drawable.update(context);
    this.drawable.draw(context);

    this.animationId = requestAnimationFrame(() => {
      this.render();
    });
  }

  cancel() {
    cancelAnimationFrame(this.animationId);
  }

  static ensureContext2D(canvas: CanvasElement): RenderingContext2D {
    const context = canvas.getContext('2d');
    if (!context) {
      throw new TypeError(`Failed to retrieve 2d context from canvas(${canvas})`);
    }

    context.lineCap = 'round';
    context.fillStyle = 'rgba(255, 255, 255, 1.0)';
    context.strokeStyle = 'rgba(255, 255, 255, 1.0)';
    context.globalAlpha = 0.1;
    context.save();
    return context;
  }
}
