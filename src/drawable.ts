import { Context } from './context';

export interface Drawable {
  update(context: Context): void;

  draw(context: Context): void;
}
