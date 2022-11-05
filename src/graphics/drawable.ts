import { Context } from './context';

/**
 * Interface representing drawable component.
 */
export interface Drawable {
  /**
   * Update the current drawable.
   *
   * @param context The current context object.
   */
  update(context: Context): void;

  /**
   * Draw the current drawable.
   *
   * @param context The current context object.
   */
  draw(context: Context): void;
}
