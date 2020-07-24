import { KeyChord } from '../input/IKeyEvent';

export default abstract class GameScreen {
  abstract show(...args: any[]): void;

  abstract update(...args: any[]): void;

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  handleKeyboardInput(keyEvent: KeyChord) {}
}
