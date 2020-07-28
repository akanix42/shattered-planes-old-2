import Component from './Component';

export default class ExplodeOnImpactComponent extends Component {
  static type = Symbol('ExplodeOnImpactComponent');

  constructor() {
    super(ExplodeOnImpactComponent.type);
  }
}
