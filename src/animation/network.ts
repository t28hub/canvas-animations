import { Color } from '../color';
import { Point } from '../math';
import { RenderingContext2D } from '../types';

import { Component, Context } from './component';
import { Particle } from './particle';

/**
 * The options for {@link Network}.
 */
export type Options = {
  /**
   * The kind of animation.
   */
  readonly kind: 'network';

  /**
   * The amount of particles.
   */
  readonly amount: number;

  /**
   * The radius of particles.
   */
  readonly radius: number;

  /**
   * The speed of particles.
   */
  readonly speed: number;

  /**
   * The color of particles.
   */
  readonly fillColor: string;

  /**
   * The color of lines.
   */
  readonly lineColor: string;

  /**
   * The width of lines.
   */
  readonly lineWidth: number;
};

const defaultColor = Color.random().format();

/**
 * The default options of {@link Options}.
 */
const defaults: Options = {
  kind: 'network',
  amount: 100,
  radius: 1,
  speed: 0.5,
  fillColor: defaultColor,
  lineColor: defaultColor,
  lineWidth: 1.0,
};

/**
 * The network animation implementation.
 */
export class Network implements Component<Options> {
  constructor(private readonly particles: ReadonlyArray<Particle>, readonly options: Options) {}

  update(_: Context) {}

  render(context: Context) {
    const { bounds, context: renderingContext } = context;
    renderingContext.clearRect(bounds.min.x, bounds.min.y, bounds.extentX, bounds.extentY);

    this.particles.forEach((particle: Particle) => {
      particle.update(context);
      particle.render(context);
      this.drawLines(context, particle);
    });
  }

  private drawLines(context: Context, particle: Particle) {
    const index = this.particles.indexOf(particle);
    if (index <= 0) {
      return;
    }

    for (let i = index; i >= 0; i--) {
      const other = this.particles.at(i);
      if (!other) {
        continue;
      }

      const distance = particle.distanceTo(other);
      if (distance > 100) {
        continue;
      }

      this.drawLine(context.context, particle.getCenter(), other.getCenter());
    }
  }

  private drawLine(renderingContext: RenderingContext2D, point1: Point, point2: Point) {
    const { lineColor, lineWidth } = this.options;
    renderingContext.lineCap = 'round';
    renderingContext.lineWidth = lineWidth;
    renderingContext.strokeStyle = lineColor;

    renderingContext.beginPath();
    renderingContext.moveTo(point1.x, point1.y);
    renderingContext.lineTo(point2.x, point2.y);
    renderingContext.stroke();
    renderingContext.closePath();
    renderingContext.restore();
  }

  static create(context: Context, options: Partial<Options> = {}): Network {
    const mergedOptions: Options = { ...defaults, ...options };
    const particles = [];
    for (let i = 0; i < mergedOptions.amount; i++) {
      const particle = Particle.create(context, { radius: mergedOptions.radius, speed: mergedOptions.speed });
      particles.push(particle);
    }
    return new Network(particles, mergedOptions);
  }
}
