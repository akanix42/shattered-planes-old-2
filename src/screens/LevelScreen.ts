import GameScreen from './Screen';
import Entity from '../entities/Entity';
import { render } from '../display/display';
import IKeyEvent from '../input/IKeyEvent';
import log from '../log';

export default class LevelScreen extends GameScreen {
  _entities: Entity[] = [];

  // eslint-disable-next-line class-methods-use-this
  handleKeyboardInput(keyboardEvent: IKeyEvent) {
    if (keyboardEvent.name === 'w') {
      this._entities[0].position.y -= 1;
      this.show();
    }
  }

  show() {
    render(this._entities);
  }

  // eslint-disable-next-line class-methods-use-this
  update(entities: Entity[]) {
    this._entities = entities;
    render(entities);
  }
}
