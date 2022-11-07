import { Component, Context } from './component';
import { Network } from './network';
import { Options } from './options';
import { Particle } from './particle';

export { type Component, type Context } from './component';
export { type Options } from './options';

export function create(context: Context, options: Partial<Options>): Component<Options> {
  switch (options.kind) {
    case 'network':
      return Network.create(context, options);
    case 'particle':
      return Particle.create(context, options);
    default:
      throw new TypeError(`Unrecognized kind of animation: ${options.kind}`);
  }
}
