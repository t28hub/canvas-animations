import { Context, create, Options } from '../animation';
import { Bounds } from '../math';
import { CanvasElement, RenderingContext2D } from '../types';

import { Player } from './playler';

const NO_ANIMATION_ID = Number.NEGATIVE_INFINITY;

/**
 * Types rendering drawable components to the given rendering context.
 */
export class CanvasPlayer implements Player {
  private readonly context: RenderingContext2D;
  private animationId: number;

  constructor(canvas: CanvasElement) {
    this.context = CanvasPlayer.ensureContext2D(canvas);
    this.animationId = NO_ANIMATION_ID;
  }

  play<T extends Options>(options: Partial<T>) {
    const canvas = this.context.canvas;
    const bounds = new Bounds({ x: 0, y: 0 }, { x: canvas.width, y: canvas.height });
    const animation = create({ bounds, context: this.context }, options);

    const frame = () => {
      const canvas = this.context.canvas;
      const bounds = new Bounds({ x: 0, y: 0 }, { x: canvas.width, y: canvas.height });
      const context: Context = { bounds, context: this.context };
      animation.update(context);
      animation.render(context);
      this.animationId = requestAnimationFrame(frame);
    };
    frame();
  }

  resize(width: number, height: number) {
    this.context.canvas.width = width;
    this.context.canvas.height = height;
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
    return context;
  }
}
