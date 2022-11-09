import { ID } from '../../utils';

export type StopEvent = {
  readonly type: 'stop';
  readonly payload: {
    readonly id: ID;
  };
};
