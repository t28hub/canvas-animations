import { Bounds } from '../math';

import { Component } from './component';
import { Network } from './network';
import { Options } from './options';
import { Particle } from './particle';

export { type Component, type Context } from './component';
export { type Options } from './options';

/**
 *
 * @param bounds
 * @param options
 */
export function create(bounds: Bounds, options: Options): Component<Options> {
  switch (options.kind) {
    case 'network':
      return Network.create(bounds, options);
    case 'particle':
      return Particle.create(bounds, options);
    default:
      throw new TypeError(`Unrecognized kind of animation is declared in ${options}`);
  }
}
