import { AlphaChannel } from './channel';
import { ColorInt } from './colorInt';

/**
 * Color model representation.
 */
export interface Model<T extends AlphaChannel> {
  /**
   * The name of color model.
   */
  readonly name: string;

  /**
   * Convert the given color to {@link ColorInt}.
   */
  toColorInt: (color: T) => ColorInt;

  /**
   * Convert the value of {@link ColorInt} to color.
   */
  fromColorInt: (value: ColorInt) => T;
}
