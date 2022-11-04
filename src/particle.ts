import { Point } from './point';

const MIN_X = 0;
const MAX_X = 800;
const MIN_Y = 0;
const MAX_Y = 450;

export class Particle {
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

  update() {
    this.center.x += this.velocityX;
    this.center.y += this.velocityY;

    if (this.center.x < MIN_X || this.center.x > MAX_X) {
      this.velocityX *= -1.0;
    }
    if (this.center.y < MIN_Y || this.center.y > MAX_Y) {
      this.velocityY *= -1.0;
    }
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
  }
}