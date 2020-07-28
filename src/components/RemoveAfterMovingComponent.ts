import delay from 'delay';
import Component from './Component';
import Entity from '../entities/Entity';
import TargetDirectionComponent from './TargetDirectionComponent';

export default class RemoveAfterMovingComponent extends Component {
  static type = Symbol('RemoveAfterMovingComponent');

  setEntity(entity: Entity) {
    super.setEntity(entity);
    entity.level.scheduler.add(this);
  }

  constructor(public countdown: number) {
    super(RemoveAfterMovingComponent.type);
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
        return false;
      }
      entity.position = {
        x: entity.position.x + targetDirection.x,
        y: entity.position.y + targetDirection.y,
      };
      level.update();
      await delay(100);
      return true;
    }

    level.entities.delete(entity);
    level.update();
    return false;
  }
}
