import { Context } from './context';
import { Drawable } from './drawable';
import { Point } from './point';

export class Particle implements Drawable {
  private readonly center: Point;
  private readonly radius: number;
  private velocityX: number;
  private velocityY: number;

  constructor(initialCenter: Point, radius: number, speed: number) {
    this.center = { ...initialCenter };
    this.radius = radius;
    this.velocityX = speed * Math.cos(Math.random() * Math.PI * 2);
    this.velocityY = speed * Math.sin(Math.random() * Math.PI * 2);
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

  draw({ renderingContext }: Context) {
    renderingContext.beginPath();
    renderingContext.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2, false);
    renderingContext.closePath();
    renderingContext.fill();
  }
}
