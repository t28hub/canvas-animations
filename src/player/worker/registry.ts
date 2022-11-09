import { ID } from '../../utils';
import { NullPlayer } from '../nullPlayer';
import { Player } from '../playler';

export class Registry {
  private readonly container: Map<ID, Player>;

  constructor() {
    this.container = new Map<ID, Player>();
  }

  findByID(id: ID, defaults: Player = NullPlayer): Player {
    return this.container.get(id) || defaults;
  }

  register(id: ID, player: Player) {
    const cached = this.container.get(id);
    if (cached && cached !== player) {
      cached.stop();
    }
    this.container.set(id, player);
  }

  delete(id: ID) {
    this.container.delete(id);
  }
}
