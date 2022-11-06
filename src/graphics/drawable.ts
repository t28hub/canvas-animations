import { Bounds } from '../math';

import { Options } from './options';
import { RenderingContext2D } from './renderer/types';

export type DrawableContext = {
  readonly bounds: Bounds;
  readonly context: RenderingContext2D;
  readonly options: Options;
};

/**
 * Interface representing drawable component.
 */
export interface Drawable {
  /**
   * Update the current drawable.
   *
   * @param context The current context object.
   */
  update(context: DrawableContext): void;

  /**
   * Draw the current drawable.
   *
   * @param context The current context object.
   */
  draw(context: DrawableContext): void;
}
