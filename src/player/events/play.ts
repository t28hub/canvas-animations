import { Options } from '../../animation';
import { ID } from '../../utils';

export type PlayEvent<T extends Options> = {
  readonly type: 'play';
  readonly payload: {
    readonly id: ID;
    readonly options: Partial<T>;
  };
};
