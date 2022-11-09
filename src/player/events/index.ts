import { Options } from '../../animation';

import { LoadEvent } from './load';
import { PlayEvent } from './play';
import { ResizeEvent } from './resize';
import { StopEvent } from './stop';

export { type LoadEvent } from './load';
export { type PlayEvent } from './play';
export { type ResizeEvent } from './resize';
export { type StopEvent } from './stop';

export type Event = LoadEvent | PlayEvent<Options> | StopEvent | ResizeEvent;
