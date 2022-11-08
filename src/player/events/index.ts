import { Options } from '../../animation';

import { PlayEvent } from './play';
import { ResizeEvent } from './resize';
import { StopEvent } from './stop';

export { type PlayEvent } from './play';
export { type ResizeEvent } from './resize';
export { type StopEvent } from './stop';

export type Event = PlayEvent<Options> | StopEvent | ResizeEvent;
