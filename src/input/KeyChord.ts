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

type KeyEventType = 'ku' | 'keyup' | 'kd' | 'keydown';
export function getKeyChord(
  key: string,
  modifiers: IKeyEventModifiers = defaultKeyEventModifiers,
  eventType: KeyEventType,
): string {
  const values: string[] = [normalizeEventType(eventType)];
  if (modifiers.ctrl) {
    values.push('ctrl');
  }
  if (modifiers.shift) {
    values.push('shift');
  }
  values.push(key);
  return values.join('+');
}

function normalizeEventType(eventType: KeyEventType) {
  if (eventType === 'keyup') {
    return 'ku';
  }

  if (eventType === 'keydown') {
    return 'kd';
  }

  return eventType;
}
export type KeyChord = string;

const keyChordRegExp = new RegExp(
  /^((?<eventType>ku|kd):)?(?<ctrl>ctrl\+)?(?<shift>shift\+)?(?<meta>meta\+)?(?<key>.+)$/,
);
const uppercaseLetterRegExp = new RegExp(/^[A-Z]$/);
const specialKeys = new Set<string>(['escape']);
export function normalizeKeyChord(keyChord: string): string {
  const match = keyChord.match(keyChordRegExp);
  if (match === null || match.groups === undefined) {
    throw new Error(`Invalid keyChord: '${keyChord}'`);
  }
  const { key } = match.groups;
  if (key.length > 1 && !specialKeys.has(key)) {
    throw new Error(`Unknown key: '${key}' (keychord: '${keyChord}')`);
  }

  const modifiers = {
    ctrl: !!match.groups.ctrl,
    shift: !!match.groups.shift || uppercaseLetterRegExp.test(keyChord),
    meta: !!match.groups.meta,
  };
  const eventType = (match.groups.eventType as KeyEventType) ?? 'ku';
  return getKeyChord(key, modifiers, eventType);
}
