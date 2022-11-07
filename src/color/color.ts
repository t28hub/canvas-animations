import { clamp } from '../math';

import { Formatter, hex } from './format';
import { AlphaChannel, ColorInt, HSL, Model, normalizeH, normalizeL, normalizeS } from './model';
import { Strategy, vivid } from './strategy';

const MIN_ALPHA = 0.0;
const MAX_ALPHA = 1.0;

export class Color implements AlphaChannel {
  /**
   * The hue value.
   */
  readonly h: number;

  /**
   * The saturation value.
   */
  readonly s: number;

  /**
   * The lightness value.
   */
  readonly l: number;

  /**
   * The alpha value.
   */
  readonly a: number;

  constructor(h: number, s: number, l: number, a: number = MAX_ALPHA) {
    this.h = normalizeH(h);
    this.s = normalizeS(s);
    this.l = normalizeL(l);
    this.a = clamp(a, MIN_ALPHA, MAX_ALPHA);
  }

  get opacity(): number {
    return this.a;
  }

  toColorInt(): ColorInt {
    return HSL.toColorInt({ h: this.h, s: this.s, l: this.l, opacity: this.opacity });
  }

  toString(): string {
    const colorInt = this.toColorInt();
    const hexValue = colorInt.toString(16).padStart(8, '0').toUpperCase();
    return `Color(0x${hexValue})`;
  }

  format(formatter: Formatter = hex): string {
    return formatter(this);
  }

  convertTo<T extends AlphaChannel>(model: Model<T>): T {
    return model.fromColorInt(this.toColorInt());
  }

  static random(strategy: Strategy = vivid): Color {
    const { h, s, l, opacity } = strategy();
    return new Color(h, s, l, opacity);
  }
}
