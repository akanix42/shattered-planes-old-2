// import ROT from 'rot-js';
// import screenStack from '../screens/screenStack';
// import { getKeyChord } from './KeyChord';

interface IKeyEvent {
  name: string;
  ctrl: boolean;
  shift: boolean;
  meta: boolean;
}
const input = document.createElement('input');
const out1 = document.createElement('div');
const out2 = document.createElement('div');
// SHOW(input, out1, out2);
input.focus();

input.addEventListener('keydown', function (e) {
  const code = e.keyCode;

  // const vk = '?'; /* find the corresponding constant */

  // for (const name in ROT.KEYS) {
  //   if (ROT.KEYS[name] == code && name.indexOf('VK_') == 0) {
  //     vk = name;
  //   }
  // }

  out1.innerHTML = `Keydown: code is ${code} (${e})`;
  // out1.innerHTML = `Keydown: code is ${code} (${vk})`;
});

input.addEventListener('keypress', function (e) {
  const code = e.charCode;
  const ch = String.fromCharCode(code);
  out2.innerHTML = `Keypress: char is ${ch} (${e})`;
});

export {};
