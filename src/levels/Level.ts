import Entity from '../entities/Entity';
import LevelScreen from '../screens/LevelScreen';

export default class Level {
  entities: Entity[] = [];

  constructor(private _screen: LevelScreen) {
    this.entities = [
      new Entity(
        {
          character: '@',
          color: null,
          backgroundColor: null,
        },
        { x: 5, y: 4 },
      ),
      new Entity(
        {
          character: '!',
          color: '#0f0',
          backgroundColor: null,
        },
        { x: 15, y: 4 },
      ),
      new Entity(
        {
          character: '$',
          color: '#f00',
          backgroundColor: '#009',
        },
        { x: 25, y: 4 },
      ),
    ];
    this.update();
  }

  update() {
    this._screen.update(this.entities);
  }
}
