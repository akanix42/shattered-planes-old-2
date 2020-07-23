import LevelScreen from './screens/LevelScreen';
import screenStack from './screens/screenStack';
import Level from './levels/Level';

export default class Game {
  static currentGame: Game = new Game();

  levelScreen = new LevelScreen();

  constructor() {
    const level = new Level(this.levelScreen);
    screenStack.push(this.levelScreen);
  }
}
