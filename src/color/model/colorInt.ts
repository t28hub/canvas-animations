declare const validColorInt: unique symbol;

/**
 * Integer representation of color.
 */
export type ColorInt = number & {
  [validColorInt]: true;
};

const MIN_COLOR_INT = 0x00000000;
const MAX_COLOR_INT = 0xffffffff;

/**
 * Convert the given value as valid {@link ColorInt}.
 *
 * @param value The value to be converted.
 * @return The valid {@link ColorInt}.
 * @throws {TypeError} if the given value is not valid {@link ColorInt}.
 */
export function asColorInt(value: number): ColorInt {
  if (value < MIN_COLOR_INT || value > MAX_COLOR_INT) {
    throw new TypeError(`The given value(${value}) is not valid distance`);
  }
  return value as ColorInt;
}
