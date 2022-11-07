import { isUndefined } from '../../utils';
import { Color } from '../color';
import { MAX_ARGB, RGB } from '../model/rgb';

import { Formatter } from './formatter';

export const hex: Formatter = (color: Color): string => {
  const { r, g, b, opacity } = color.convertTo(RGB);
  const components = [r, g, b];
  if (!isUndefined(opacity)) {
    components.push(Math.round(opacity * MAX_ARGB));
  }

  return components.reduce((hexString: string, value: number): string => {
    const string = value.toString(16).padStart(2, '0').toUpperCase();
    return `${hexString}${string}`;
  }, '#');
};
