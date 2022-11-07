import { Context, create, Options } from '../animation';
import { Bounds } from '../math';
import { CanvasElement, RenderingContext2D } from '../types';

import { Player } from './playler';

const NO_ANIMATION_ID = Number.NEGATIVE_INFINITY;

/**
 * Types rendering drawable components to the given rendering context.
 */
export class CanvasPlayer implements Player {
  private readonly bounds: Bounds;
  private readonly context: RenderingContext2D;
  private animationId: number;

  constructor(canvas: CanvasElement) {
    this.bounds = new Bounds({ x: 0, y: 0 }, { x: canvas.width, y: canvas.height });
    this.context = CanvasPlayer.ensureContext2D(canvas);
    this.animationId = NO_ANIMATION_ID;
  }

  play<T extends Options>(options: T) {
    const animation = create(this.bounds, options);
    const context: Context<T> = {
      bounds: this.bounds,
      context: this.context,
      options,
    };
    const frame = () => {
      animation.update(context);
      animation.render(context);
      this.animationId = requestAnimationFrame(frame);
    };
    frame();
  }

  stop() {
    cancelAnimationFrame(this.animationId);
    this.animationId = NO_ANIMATION_ID;
  }

  static ensureContext2D(canvas: CanvasElement): RenderingContext2D {
    const context = canvas.getContext('2d');
    if (!context) {
      throw new TypeError(`Failed to retrieve 2d context from canvas(${canvas})`);
    }

    context.lineCap = 'round';
    context.lineWidth = 1;
    context.fillStyle = 'rgba(255, 255, 255, 0.5)';
    context.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    context.save();
    return context;
  }
}
