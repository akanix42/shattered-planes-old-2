import Component from './Component';

export default class ImpactComponent extends Component {
  static type = Symbol('ImpactComponent');

  constructor() {
    super(ImpactComponent.type);
  }
}
