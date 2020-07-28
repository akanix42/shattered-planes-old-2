import { match } from 'assert';
import type Entity from '../entities/Entity';
import Component from './Component';

export default class Components {
  private components = new Map<Symbol, Component>();

  constructor(readonly entity: Entity) {}

  public add(component: Component) {
    component.setEntity(this.entity);
    this.components.set(component.componentType, component);
  }

  public get<T>(componentType: Symbol): T | undefined {
    return this.components.get(componentType) as T | undefined;
  }

  public find(predicate: (component: Component) => boolean) {
    const matchingComponents: Component[] = [];
    this.components.forEach((component) => {
      if (predicate(component)) {
        matchingComponents.push(component);
      }
    });
    return matchingComponents;
  }

  public remove(component: Component) {
    this.components.delete(component.componentType);
  }
}
