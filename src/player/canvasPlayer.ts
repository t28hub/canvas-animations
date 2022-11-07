import { Context, create, Options } from '../animation';
import { Bounds } from '../math';
import { CanvasElement, RenderingContext2D } from '../types';

import { Player } from './playler';

const NO_ANIMATION_ID = Number.NEGATIVE_INFINITY;

/**
 * Types rendering drawable components to the given rendering context.
 */
export class CanvasPlayer implements Player {
  private readonly context: Context;
  private animationId: number;

  constructor(canvas: CanvasElement) {
    this.context = {
      bounds: new Bounds({ x: 0, y: 0 }, { x: canvas.width, y: canvas.height }),
      context: CanvasPlayer.ensureContext2D(canvas),
    };
    this.animationId = NO_ANIMATION_ID;
  }

  play<T extends Options>(options: Partial<T>) {
    const animation = create(this.context, options);
    console.info({ animation });
    const frame = () => {
      animation.update(this.context);
      animation.render(this.context);
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
    return context;
  }
}
