import { Options } from '../animation';

/**
 * Animation player interface
 */
export interface Player {
  /**
   * Play animation with the given options.
   *
   * @param options The animation options.
   */
  play<T extends Options>(options: T): void;

  /**
   * Stop the current animation.
   */
  stop(): void;
}
