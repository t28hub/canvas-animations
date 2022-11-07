/**
 * Clamp the given value.
 *
 * @param value The value to be clamped.
 * @param min The minimum value.
 * @param max The maximum value.
 * @return The clamped value.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
