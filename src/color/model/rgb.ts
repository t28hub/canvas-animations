import { clamp } from '../../math';
import { isUndefined } from '../../utils';

import { AlphaChannel } from './channel';
import { asColorInt, ColorInt } from './colorInt';
import { Model } from './model';

const SHIFT_A = 24;
const SHIFT_R = 16;
const SHIFT_G = 8;
const SHIFT_B = 0;

/**
 * The minimum value of ARGB.
 */
export const MIN_ARGB = 0x00;

/**
 * The maximum value of ARGB.
 */
export const MAX_ARGB = 0xff;

/**
 * RGB color representation.
 */
export type RGBColor = {
  /**
   * The red value.
   */
  readonly r: number;

  /**
   * The green value.
   */
  readonly g: number;

  /**
   * The blue value.
   */
  readonly b: number;
} & AlphaChannel;

/**
 * RGB color model.
 */
export const RGB: Model<RGBColor> = {
  name: 'rgb',

  toColorInt(color: RGBColor): ColorInt {
    const r = clamp(color.r, MIN_ARGB, MAX_ARGB);
    const g = clamp(color.g, MIN_ARGB, MAX_ARGB);
    const b = clamp(color.b, MIN_ARGB, MAX_ARGB);

    const opacity = isUndefined(color.opacity) ? 1.0 : color.opacity;
    const a = clamp(opacity * MAX_ARGB, MIN_ARGB, MAX_ARGB);

    // Force conversion to uint32.
    const colorInt = ((a << SHIFT_A) | (r << SHIFT_R) | (g << SHIFT_G) | (b << SHIFT_B)) >>> 0;
    return asColorInt(colorInt);
  },

  fromColorInt(value: ColorInt): RGBColor {
    const a = (value >> SHIFT_A) & MAX_ARGB;
    const r = (value >> SHIFT_R) & MAX_ARGB;
    const g = (value >> SHIFT_G) & MAX_ARGB;
    const b = (value >> SHIFT_B) & MAX_ARGB;
    const opacity = a / MAX_ARGB;
    return { r, g, b, opacity };
  },
};
