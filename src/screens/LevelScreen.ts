import keybindings from '@config/keymaps/levelScreen.kb.yaml';
import GameScreen from './Screen';
import Entity from '../entities/Entity';
import { render } from '../display/display';
import { normalizeKeyChord, KeyChord } from '../input/KeyChord';
import IHashMap from '../lib/IHashMap';
import NotImplementedError from '../errors/NotImplementedError';

interface IKeyMap {
  keymap: IHashMap<string>;
}
interface ICommand {
  (...args: any[]): void;
}

export default class LevelScreen extends GameScreen {
  private commands = new Map<string, ICommand>();

  private entities: Entity[] = [];

  private keyboardEventCommandMap = new Map<string, ICommand>();

  constructor() {
    super();
    this.loadCommands();
    this.loadKeymap();
  }

  private loadCommands() {
    const { commands } = this;
    commands.set('DirectionNorth', () => {
      this.entities[0].position.y -= 1;
    });
    commands.set('DirectionNorthwest', () => {
      this.entities[0].position.x -= 1;
      this.entities[0].position.y -= 1;
    });
    commands.set('DirectionNortheast', () => {
      this.entities[0].position.x += 1;
      this.entities[0].position.y -= 1;
    });
    commands.set('DirectionWest', () => {
      this.entities[0].position.x -= 1;
    });
    commands.set('DirectionEast', () => {
      this.entities[0].position.x += 1;
    });
    commands.set('DirectionSouth', () => {
      this.entities[0].position.y += 1;
    });
    commands.set('DirectionSouthwest', () => {
      this.entities[0].position.x -= 1;
      this.entities[0].position.y += 1;
    });
    commands.set('DirectionSoutheast', () => {
      this.entities[0].position.x += 1;
      this.entities[0].position.y += 1;
    });
    commands.set('Inventory', () => {
      throw new NotImplementedError();
    });
    commands.set('Quit', () => {
      process.exit();
    });
  }

  private loadKeymap() {
    // const keymap = loadConfigFile<IHashMap<string>>('keymaps/levelScreen.yaml');
    this.keyboardEventCommandMap.clear();

    const { commands } = this;
    Object.entries(keybindings).forEach(([commandName, keyChord]) => {
      const normalizedKeyChord = normalizeKeyChord(keyChord);
      const command = commands.get(commandName);
      if (command === undefined) {
        throw new Error(`Command '${commandName}' not found`);
      }
      this.keyboardEventCommandMap.set(normalizedKeyChord, command);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  handleKeyboardInput(keyChord: KeyChord) {
    const command = this.keyboardEventCommandMap.get(keyChord);
    if (command === undefined) {
      return;
    }
    command();
    this.show();
  }

  show() {
    render(this.entities);
  }

  // eslint-disable-next-line class-methods-use-this
  update(entities: Entity[]) {
    this.entities = entities;
    render(entities);
  }
}
