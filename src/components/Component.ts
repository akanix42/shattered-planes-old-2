import type Entity from '../entities/Entity';

export default class Component {
  protected entity: Entity | null = null;

  constructor(readonly componentType: Symbol) {}

  getEntity() {
    return this.entity;
  }

  setEntity(entity: Entity) {
    this.entity = entity;
  }
}
