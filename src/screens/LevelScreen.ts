import keybindings from '@config/keymaps/levelScreen.kb.yaml';
import GameScreen from './Screen';
import Entity from '../entities/Entity';
import { render } from '../display/display';
import { normalizeKeyChord, KeyChord } from '../input/KeyChord';
import IHashMap from '../lib/IHashMap';
import NotImplementedError from '../errors/NotImplementedError';
import SpellComponent from '../components/SpellComponent';
import TargetDirectionComponent from '../components/TargetDirectionComponent';
import Direction from '../lib/Direction';
import type Level from '../levels/Level';
import app from '../app';
import ExplodeAfterMovingComponent from '../components/ExplodeAfterMovingComponent';

interface IKeyMap {
  keymap: IHashMap<string>;
}
interface ICommand {
  (...args: any[]): void;
}

export default class LevelScreen extends GameScreen {
  private commands = new Map<string, ICommand>();

  private entities = new Set<Entity>();

  private level: Level | null = null;

  private keyboardEventCommandMap = new Map<string, ICommand>();

  constructor() {
    super();
    this.loadCommands();
    this.loadKeymap();
  }

  private loadCommands() {
    const { commands } = this;
    commands.set('DirectionNorth', () => {
      app.player.position.y -= 1;
    });
    commands.set('DirectionNorthwest', () => {
      app.player.position.x -= 1;
      app.player.position.y -= 1;
    });
    commands.set('DirectionNortheast', () => {
      app.player.position.x += 1;
      app.player.position.y -= 1;
    });
    commands.set('DirectionWest', () => {
      app.player.position.x -= 1;
    });
    commands.set('DirectionEast', () => {
      app.player.position.x += 1;
    });
    commands.set('DirectionSouth', () => {
      app.player.position.y += 1;
    });
    commands.set('DirectionSouthwest', () => {
      app.player.position.x -= 1;
      app.player.position.y += 1;
    });
    commands.set('DirectionSoutheast', () => {
      app.player.position.x += 1;
      app.player.position.y += 1;
    });
    commands.set('Inventory', () => {
      throw new NotImplementedError();
    });
    commands.set('Quit', () => {
      process.exit();
    });
    commands.set('Zap', () => {
      this.entities.add(
        Entity.create(
          { character: '*', color: 'orange', backgroundColor: null },
          {
            x: app.player.position.x + 1,
            y: app.player.position.y,
          },
          this.level!,
          [
            new SpellComponent(),
            new TargetDirectionComponent(Direction.East),
            new ExplodeAfterMovingComponent(5),
          ],
        ),
      );
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
    render([...this.entities]);
  }

  // eslint-disable-next-line class-methods-use-this
  update(level: Level, entities: Set<Entity>) {
    this.level = level;
    this.entities = entities;
    render([...entities]);
  }
}
