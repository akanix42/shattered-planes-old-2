import readline from 'readline';
import screenStack from '../screens/screenStack';
import { getKeyChord } from './KeyChord';

interface IKeyEvent {
  name: string;
  ctrl: boolean;
  shift: boolean;
  meta: boolean;
}

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (_str, keyEvent: IKeyEvent) => {
  if (keyEvent.ctrl && keyEvent.name === 'c') {
    process.exit();
  } else {
    const { name, ...modifiers } = keyEvent;
    const keyChordDown = getKeyChord(name, modifiers, 'keydown');
    const keyChordUp = getKeyChord(name, modifiers, 'keyup');
    screenStack.passKeyboardInput(keyChordDown);
    screenStack.passKeyboardInput(keyChordUp);
  }
});
