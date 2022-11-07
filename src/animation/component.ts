import { Bounds } from '../math';
import { RenderingContext2D } from '../types';

/**
 * Type representing animation context.
 */
export type Context = {
  /**
   * The current bounds.
   */
  readonly bounds: Bounds;

  /**
   * The current rendering 2d context.
   */
  readonly context: RenderingContext2D;
};

/**
 * Animation component interface.
 */
export interface Component<T> {
  readonly options: T;

  /**
   * Update the current component.
   *
   * @param context The current context.
   */
  update(context: Context): void;

  /**
   * Render the current component.
   *
   * @param context The current context.
   */
  render(context: Context): void;
}
