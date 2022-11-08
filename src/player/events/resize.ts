export type ResizeEvent = {
  readonly type: 'resize';
  readonly payload: {
    readonly width: number;
    readonly height: number;
  };
};
