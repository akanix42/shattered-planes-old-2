import type { IActor } from '../scheduler/Scheduler';
import Component from './Component';

export default class ActorComponent extends Component {
  static type = Symbol('ActorComponent');

  constructor() {
    super(ActorComponent.type);
  }

  act() {
    const actingComponents: IActor[] = this.entity?.components.find(
      (component) => 'act' in component,
    ) as any;
    actingComponents.forEach((component) => component.act());
  }
}
