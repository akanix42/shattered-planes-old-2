export default interface IKeyEvent {
  name: string;
}

interface IKeyEventModifiers {
  ctrl: boolean;
  shift: boolean;
}
const defaultKeyEventModifiers: IKeyEventModifiers = {
  ctrl: false,
  shift: false,
};

export function getKeyChord(
  key: string,
  modifiers: IKeyEventModifiers = defaultKeyEventModifiers,
): string {
  const values = [];
  if (modifiers.ctrl) {
    values.push('ctrl');
  }
  if (modifiers.shift) {
    values.push('shift');
  }
  values.push(key);
  return values.join('+');
}

export type KeyChord = string;

const keyChordRegExp = new RegExp(/^(ctrl\+)?(shift\+)?.$/);
const uppercaseLetter = new RegExp(/^[A-Z]$/);

export function normalizeKeyChord(keyChord: string): string {
  if (!keyChordRegExp.test(keyChord)) {
    throw new Error('Invalid keyChord');
  }

  if (uppercaseLetter.test(keyChord)) {
    return `shift+${keyChord.toLowerCase()}`;
  }

  return keyChord;
}
