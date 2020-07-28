import Component from './Component';
import Direction from '../lib/Direction';

export default class TargetDirectionComponent extends Component {
  static type = Symbol('TargetDirectionComponent');

  constructor(readonly direction: Direction) {
    super(TargetDirectionComponent.type);
  }
}
