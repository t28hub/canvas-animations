import { Color } from '../color';
import { Distance, DistanceMeasure, EuclideanDistance, Point } from '../math';

import { Component, Context } from './component';

export type Options = {
  readonly kind: 'particle';
  readonly radius: number;
  readonly speed: number;
  readonly color: string;
};

const defaultColor = Color.random().format();

const defaults: Options = {
  kind: 'particle',
  radius: 1,
  speed: 0.5,
  color: defaultColor,
};

export class Particle implements Component<Options> {
  private readonly center: Point;
  private velocityX: number;
  private velocityY: number;

  constructor(initialCenter: Point, readonly options: Options) {
    this.center = { ...initialCenter };
    this.velocityX = options.speed * Math.cos(Math.random() * Math.PI * 2);
    this.velocityY = options.speed * Math.sin(Math.random() * Math.PI * 2);
  }

  getCenter(): Readonly<Point> {
    return this.center;
  }

  update({ bounds }: Context) {
    this.center.x += this.velocityX;
    this.center.y += this.velocityY;

    if (bounds.contains(this.center)) {
      return;
    }
    if (!bounds.containsX(this.center.x)) {
      this.velocityX *= -1.0;
    }
    if (!bounds.containsY(this.center.y)) {
      this.velocityY *= -1.0;
    }
  }

  render({ context }: Context) {
    const { color, radius } = this.options;
    context.fillStyle = color;

    context.beginPath();
    context.arc(this.center.x, this.center.y, radius, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
    context.restore();
  }

  /**
   * Compute the distance to the other particle.
   * @param other The other particle.
   * @param distanceMeasure The {@link DistanceMeasure} to be used.
   * @return The distance to the other particle.
   */
  distanceTo(other: Particle, distanceMeasure: DistanceMeasure = EuclideanDistance): Distance {
    return distanceMeasure(this.center, other.center);
  }

  static create({ bounds }: Context, options: Partial<Options> = {}): Particle {
    const center = {
      x: bounds.min.x + Math.random() * bounds.extentX,
      y: bounds.min.y + Math.random() * bounds.extentY,
    };
    const mergedOptions: Options = { ...defaults, ...options };
    return new Particle(center, mergedOptions);
  }
}
