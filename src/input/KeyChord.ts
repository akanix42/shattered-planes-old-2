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

const keyChordRegExp = new RegExp(/^(ctrl\+)?(shift\+)?(?<key>.[^+]*)$/);
const uppercaseLetter = new RegExp(/^[A-Z]$/);
const specialKeys = new Set<string>(['escape']);

export function normalizeKeyChord(keyChord: string): string {
  const match = keyChord.match(keyChordRegExp);
  if (match === null || match.groups === undefined) {
    throw new Error(`Invalid keyChord: '${keyChord}'`);
  }

  if (uppercaseLetter.test(keyChord)) {
    return `shift+${keyChord.toLowerCase()}`;
  }

  const { key } = match.groups;
  if (key.length === 1) {
    return keyChord;
  }

  if (!specialKeys.has(key)) {
    throw new Error(`Unknown key: '${key}' (keychord: '${keyChord}')`);
  }

  return keyChord;
}
