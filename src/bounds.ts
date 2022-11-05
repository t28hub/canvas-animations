import { Point } from './point';

export class Bounds {
  readonly min: Readonly<Point>;
  readonly max: Readonly<Point>;

  constructor(min: Point, max: Point) {
    this.min = { ...min };
    this.max = { ...max };
  }

  get extentX(): number {
    return this.max.x - this.min.x;
  }

  get extentY(): number {
    return this.max.y - this.min.y;
  }

  containsX(x: number): boolean {
    return this.min.x <= x && x <= this.max.x;
  }

  containsY(y: number): boolean {
    return this.min.y <= y && y <= this.max.y;
  }

  contains(point: Point): boolean {
    return this.containsX(point.x) && this.containsY(point.y);
  }
}