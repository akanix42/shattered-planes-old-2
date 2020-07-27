import IKeyEvent, { KeyChord } from '../input/KeyChord';
import GameScreen from './Screen';

class ScreenStack {
  private _screens: GameScreen[] = [];

  private _currentScreen?: GameScreen;

  push(screen: GameScreen) {
    this._screens.push(screen);
    this._currentScreen = screen;
    this._currentScreen.show();
    globalThis.currentScreen = screen;
  }

  pop() {
    this._screens.pop();
    this._currentScreen = this._screens[this._screens.length - 1];
    this._currentScreen.show();
  }

  passKeyboardInput(keyChord: KeyChord) {
    this._currentScreen?.handleKeyboardInput(keyChord);
  }
}

const screenStack = new ScreenStack();
export default screenStack;
