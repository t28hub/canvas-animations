import { Bounds, Point } from '../math';

import { Context } from './context';
import { Drawable } from './drawable';
import { Particle } from './particle';

export class Network implements Drawable {
  constructor(private readonly particles: ReadonlyArray<Particle>) {}

  update(_: Context) {}

  draw(context: Context) {
    const { width, height, renderingContext } = context;
    renderingContext.clearRect(0, 0, width, height);

    this.particles.forEach((particle: Particle) => {
      particle.update(context);
      particle.draw(context);
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

      this.drawLine(context.renderingContext, particle.getCenter(), other.getCenter());
    }
  }

  private drawLine(renderingContext: CanvasRenderingContext2D, point1: Point, point2: Point) {
    renderingContext.beginPath();
    renderingContext.moveTo(point1.x, point1.y);
    renderingContext.lineTo(point2.x, point2.y);
    renderingContext.stroke();
    renderingContext.closePath();
  }

  static random(bounds: Bounds): Network {
    const minX = bounds.min.x;
    const minY = bounds.min.y;
    const particles = [];
    for (let i = 0; i < 250; i++) {
      const initialPoint = {
        x: minX + Math.random() * bounds.extentX,
        y: minY + Math.random() * bounds.extentY,
      };
      particles.push(new Particle(initialPoint, 2, 1));
    }
    return new Network(particles);
  }
}
