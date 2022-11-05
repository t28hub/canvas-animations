import { Bounds } from './bounds';
import { Context } from './context';
import { Drawable } from './drawable';

const NO_ANIMATION_ID = -1;

export class Renderer {
  private readonly context: Omit<Context, 'renderingContext'>;
  private animationId: number;

  constructor(bounds: Bounds, private readonly drawable: Drawable) {
    this.context = { width: bounds.extentX, height: bounds.extentY, bounds };
    this.animationId = NO_ANIMATION_ID;
  }

  start(renderingContext: CanvasRenderingContext2D) {
    const newContext: Context = { ...this.context, renderingContext };
    this.drawable.update(newContext);
    this.drawable.draw(newContext);

    this.animationId = requestAnimationFrame(() => {
      this.start(renderingContext)
    });
  }

  cancel() {
    cancelAnimationFrame(this.animationId);
  }
}