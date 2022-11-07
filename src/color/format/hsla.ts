import { Color } from '../color';

import { Formatter } from './formatter';

export const hsla: Formatter = (color: Color): string => {
  const { h, s, l, opacity } = color;
  return `hsla(${h}, ${s * 100}%, ${l * 100}%, ${opacity})`;
};
