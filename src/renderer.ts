import { Particle } from './particle';

const NO_ANIMATION_ID = -1;

export class Renderer {
  private readonly particles: ReadonlyArray<Particle>;
  private animationId: number;

  constructor(maxX: number, maxY: number) {
    const particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle({ x: Math.random() * maxX, y: Math.random() * maxY }, 2, 1));
    }
    this.particles = particles;
    this.animationId = NO_ANIMATION_ID;
  }

  start(context: CanvasRenderingContext2D) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    this.particles.forEach((particle: Particle) => {
      particle.update();
      particle.draw(context);
    });

    this.animationId = requestAnimationFrame(() => this.start(context));
  }

  cancel() {
    cancelAnimationFrame(this.animationId);
  }
}