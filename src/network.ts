import { Bounds } from './bounds';
import { Context } from './context';
import { Drawable } from './drawable';
import { Particle } from './particle';
import { Point } from './point';

export class Network implements Drawable {
  constructor(private readonly particles: ReadonlyArray<Particle>) {}

  update({ width, height, renderingContext }: Context) {
    renderingContext.clearRect(0, 0, width, height);
  }

  draw(context: Context) {
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
    for (let i = 0; i < 50; i++) {
      const initialPoint = {
        x: minX + Math.random() * bounds.extentX,
        y: minY + Math.random() * bounds.extentY,
      };
      particles.push(new Particle(initialPoint, 2, 1));
    }
    return new Network(particles);
  }
}
