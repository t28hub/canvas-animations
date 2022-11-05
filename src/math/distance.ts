import { Point } from './point';

declare const validDistance: unique symbol;

/**
 * Type representing distance.
 */
export type Distance = number & {
  [validDistance]: true;
};

/**
 * Convert the given value as valid {@link Distance}.
 *
 * @param distanceLike The distance like value.
 * @return The valid distance value.
 * @throws {TypeError} if the distanceLike is not finite number.
 */
function toDistance(distanceLike: Omit<number, 'validDistance'>): Distance {
  if (!Number.isFinite(distanceLike)) {
    throw new TypeError(`The given value(${distanceLike}) is not valid distance`);
  }
  return distanceLike as Distance;
}

/**
 * Function computing the distance between 2 points.
 *
 * @param point1 The 1st point.
 * @param point2 The 2nd point.
 * @return The distance between point1 and point2.
 */
export type DistanceMeasure = (point1: Point, point2: Point) => Distance;

/**
 * Function computing the euclidean distance between 2 points.
 *
 * @param point1 The 1st point.
 * @param point2 The 2nd point.
 * @return The euclidean distance between point1 and point2.
 */
export const EuclideanDistance: DistanceMeasure = (point1: Point, point2: Point): Distance => {
  const squared = SquaredEuclideanDistance(point1, point2);
  return toDistance(Math.sqrt(squared));
};

/**
 * Function computing the squared euclidean distance between 2 points.
 *
 * @param point1 The 1st point.
 * @param point2 The 2nd point.
 * @return The squared euclidean distance between point1 and point2.
 */
export const SquaredEuclideanDistance: DistanceMeasure = (point1: Point, point2: Point): Distance => {
  const deltaX = point1.x - point2.x;
  const deltaY = point1.y - point2.y;
  return toDistance(deltaX * deltaX + deltaY * deltaY);
};
