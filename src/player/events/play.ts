import { Options } from '../../animation';

export type PlayEvent<T extends Options> = {
  readonly type: 'play';
  readonly payload: {
    readonly canvas: OffscreenCanvas;
    readonly options: Partial<T>;
  };
};
