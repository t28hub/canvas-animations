import { isUndefined } from '../../utils';
import { Color } from '../color';
import { RGB } from '../model/rgb';

import { Formatter } from './formatter';

export const rgba: Formatter = (color: Color): string => {
  const rgb = color.convertTo(RGB);
  if (isUndefined(rgb.opacity)) {
    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  }
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.opacity})`;
};
