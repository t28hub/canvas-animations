import { Bounds, Point } from '../math';

import { Drawable, DrawableContext } from './drawable';
import { Options } from './options';
import { Particle } from './particle';

export class Network implements Drawable {
  constructor(private readonly particles: ReadonlyArray<Particle>) {}

  update(_: DrawableContext) {}

  draw(context: DrawableContext) {
    const { bounds, context: renderingContext } = context;
    renderingContext.clearRect(bounds.min.x, bounds.min.y, bounds.extentX, bounds.extentY);

    this.particles.forEach((particle: Particle) => {
      particle.update(context);
      particle.draw(context);
      this.drawLines(context, particle);
    });
  }

  private drawLines(context: DrawableContext, particle: Particle) {
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

  static initialize(bounds: Bounds, options: Options): Network {
    const minX = bounds.min.x;
    const minY = bounds.min.y;
    const particles = [];
    for (let i = 0; i < options.amount; i++) {
      const initialPoint = {
        x: minX + Math.random() * bounds.extentX,
        y: minY + Math.random() * bounds.extentY,
      };
      particles.push(new Particle(initialPoint, options.radius, options.speed));
    }
    return new Network(particles);
  }
}
