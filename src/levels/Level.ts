import Entity from '../entities/Entity';
import LevelScreen from '../screens/LevelScreen';
import Scheduler from '../scheduler/Scheduler';
import app from '../app';

export default class Level {
  entities = new Set<Entity>();

  scheduler = new Scheduler();

  constructor(private _screen: LevelScreen) {
    const player = new Entity(
      {
        character: '@',
        color: null,
        backgroundColor: null,
      },
      { x: 5, y: 4 },
      this,
    );
    app.player = player;
    this.entities = new Set([
      player,
      new Entity(
        {
          character: '!',
          color: '#0f0',
          backgroundColor: null,
        },
        { x: 15, y: 4 },
        this,
      ),
      new Entity(
        {
          character: '$',
          color: '#f00',
          backgroundColor: '#009',
        },
        { x: 25, y: 4 },
        this,
      ),
    ]);
    this.update();
  }

  update() {
    this._screen.update(this, this.entities);
  }
}
