import { ID } from '../../utils';

export type LoadEvent = {
  readonly type: 'load';
  readonly payload: {
    readonly id: ID;
    readonly canvas: OffscreenCanvas;
  };
};
