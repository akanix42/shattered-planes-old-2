import readline from 'readline';
import log from '../log';
import screenStack from '../screens/screenStack';

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit();
  } else {
    const keyEvent = {
      ...key,
    };
    screenStack.passKeyboardInput(keyEvent);
    // log.info(`You pressed the "${str}" key`);
    // log.info();
    // log.info(key);
    // log.info();
  }
});
