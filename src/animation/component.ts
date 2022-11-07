import { Bounds } from '../math';
import { RenderingContext2D } from '../types';

/**
 * Type representing animation context.
 */
export type Context<T> = {
  /**
   * The current bounds.
   */
  readonly bounds: Bounds;

  /**
   * The current rendering 2d context.
   */
  readonly context: RenderingContext2D;

  /**
   * The animation options.
   */
  readonly options: T;
};

/**
 * Animation component interface.
 */
export interface Component<T> {
  /**
   * Update the current component.
   *
   * @param context The current context.
   */
  update(context: Context<T>): void;

  /**
   * Render the current component.
   *
   * @param context The current context.
   */
  render(context: Context<T>): void;
}
