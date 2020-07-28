import Component from './Component';

export default class SpellComponent extends Component {
  static type = Symbol('SpellComponent');

  constructor() {
    super(SpellComponent.type);
  }
}
