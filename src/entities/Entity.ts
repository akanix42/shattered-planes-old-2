import type ITextGraphics from '../display/ITextGraphics';
import type IPosition from './IPosition';
import type Component from '../components/Component';
import Components from '../components/Components';
import type Level from '../levels/Level';

export default class Entity {
  public readonly components = new Components(this);

  static create(
    textGraphics: ITextGraphics,
    position: IPosition,
    level: Level,
    components: Component[] = [],
  ) {
    const entity = new Entity(textGraphics, position, level);

    components.forEach((component) => {
      entity.components.add(component);
    });
    return entity;
  }

  constructor(
    public textGraphics: ITextGraphics,
    public position: IPosition,
    public level: Level,
  ) {}
}
