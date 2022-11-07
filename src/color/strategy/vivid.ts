import { HSLColor, MAX_H } from '../model';

import { Strategy } from './strategy';

export const vivid: Strategy = (): HSLColor => {
  const h = Math.round(Math.random() * MAX_H);
  const s = Math.round(Math.random() * 25 + 50) / 100;
  const l = Math.round(Math.random() * 25 + 50) / 100;
  return { h, s, l, opacity: 1.0 };
};
