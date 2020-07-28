import delay from 'delay';
import Component from './Component';
import Entity from '../entities/Entity';
import TargetDirectionComponent from './TargetDirectionComponent';
import Direction from '../lib/Direction';
import RemoveAfterMovingComponent from './RemoveAfterMovingComponent';

export default class ExplodeAfterMovingComponent extends Component {
  static type = Symbol('ExplodeAfterMovingComponent');

  setEntity(entity: Entity) {
    super.setEntity(entity);
    entity.level.scheduler.add(this);
  }

  constructor(public countdown: number) {
    super(ExplodeAfterMovingComponent.type);
  }

  async act(): Promise<boolean> {
    const { entity } = this;
    if (!entity) {
      return false;
    }
    const { level } = entity;
    this.countdown -= 1;
    if (this.countdown > 0) {
      const targetDirection = entity.components.get<TargetDirectionComponent>(
        TargetDirectionComponent.type,
      )?.direction;
      if (!targetDirection) {
        return true;
      }
      entity.position = {
        x: entity.position.x + targetDirection.x,
        y: entity.position.y + targetDirection.y,
      };
      level.update();
      await delay(100);
      return true;
    }

    Direction.Directions.forEach((direction) => {
      level.entities.add(
        Entity.create(entity.textGraphics, entity.position, level, [
          new TargetDirectionComponent(direction),
          new RemoveAfterMovingComponent(3),
        ]),
      );
    });
    level.entities.delete(entity);
    level.update();
    return false;
  }
}
