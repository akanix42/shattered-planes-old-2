import { Display } from 'rot-js';

const display = new Display({ width: 40, height: 9, layout: 'rect' });
export default display;

document.body.appendChild(display.getContainer()!);
