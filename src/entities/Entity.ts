import ITextGraphics from '../display/ITextGraphics';
import IPosition from './IPosition';

export default class Entity {
  constructor(public textGraphics: ITextGraphics, public position: IPosition) {}
}
