import { ID } from '../../utils';

export type ResizeEvent = {
  readonly type: 'resize';
  readonly payload: {
    readonly id: ID;
    readonly width: number;
    readonly height: number;
  };
};
