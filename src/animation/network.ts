import { Bounds, Point } from '../math';

import { Component, Context } from './component';
import { Particle, Options as ParticleOptions } from './particle';

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
};

/**
 * The default options of {@link Options}.
 */
const defaults: Required<Options> = {
  kind: 'network',
  amount: 100,
  radius: 1,
  speed: 0.5,
};

/**
 * The network animation implementation.
 */
export class Network implements Component<Options> {
  constructor(private readonly particles: ReadonlyArray<Particle>) {}

  update(_: Context<Options>) {}

  render(context: Context<Options>) {
    const { bounds, context: renderingContext, options } = context;
    renderingContext.clearRect(bounds.min.x, bounds.min.y, bounds.extentX, bounds.extentY);

    const particleContext: Context<ParticleOptions> = {
      ...context,
      options: { ...options, kind: 'particle' },
    };
    this.particles.forEach((particle: Particle) => {
      particle.update(particleContext);
      particle.render(particleContext);
      this.drawLines(context, particle);
    });
  }

  private drawLines(context: Context<Options>, particle: Particle) {
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

  private drawLine(
    renderingContext: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    point1: Point,
    point2: Point,
  ) {
    renderingContext.beginPath();
    renderingContext.moveTo(point1.x, point1.y);
    renderingContext.lineTo(point2.x, point2.y);
    renderingContext.stroke();
    renderingContext.closePath();
  }

  /**
   * Instantiate {@link Network}
   *
   * @param bounds
   * @param options
   */
  static create(bounds: Bounds, options: Partial<Options> = {}): Network {
    const { amount, radius, speed } = { ...defaults, ...options };
    const particles = [];
    for (let i = 0; i < amount; i++) {
      const particle = Particle.create(bounds, { radius, speed });
      particles.push(particle);
    }
    return new Network(particles);
  }
}
