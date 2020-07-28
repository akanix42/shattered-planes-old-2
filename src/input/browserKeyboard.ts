import { getKeyChord } from './KeyChord';
import screenStack from '../screens/screenStack';

window.addEventListener('keyup', function (keyEvent) {
  const { key, ctrlKey, metaKey, shiftKey } = keyEvent;
  const modifiers = { ctrl: ctrlKey, meta: metaKey, shift: shiftKey };
  const keyChord = getKeyChord(key, modifiers, 'keyup');
  screenStack.passKeyboardInput(keyChord);
});

window.addEventListener('keydown', function (keyEvent) {
  const { key, ctrlKey, metaKey, shiftKey } = keyEvent;
  const modifiers = { ctrl: ctrlKey, meta: metaKey, shift: shiftKey };
  const keyChord = getKeyChord(key, modifiers, 'keydown');
  screenStack.passKeyboardInput(keyChord);
});

export {};
