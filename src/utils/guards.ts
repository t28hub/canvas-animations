/**
 * Check whether the given value is undefined.
 *
 * @param value The value to be checked.
 * @return true if the given value is undefined.
 */
export function isUndefined(value: unknown): value is undefined {
  return typeof value === 'undefined';
}
