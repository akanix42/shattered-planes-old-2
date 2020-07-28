import Entity from '../entities/Entity';

// #if target=="web"
import display from './browserDisplay';
//  #endif
// #if target=="node"
// import display from './nodeDisplay';
// const display = new Display({ width: 40, height: 9, layout: 'term' });
//  #endif

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
