import { Display } from 'rot-js';
import { isBrowser } from 'browser-or-node';
import Entity from '../entities/Entity';

const display = isBrowser
  ? (await import('./browserDisplay')).default
  : new Display({ width: 40, height: 9, layout: 'term' });

export default display;

export function render(entities: Entity[]) {
  display.clear();
  entities.forEach((entity) => {
    const { position } = entity;
    const graphics = entity.textGraphics;
    display.draw(
      position.x,
      position.y,
      graphics.character,
      graphics.color,
      graphics.backgroundColor,
    );
  });
}
