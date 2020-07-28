import delay from 'delay';
import Simple from 'rot-js/lib/scheduler/simple';

export interface IActor {
  act(): Promise<void> | void | Promise<boolean> | boolean;
}
export default class Scheduler {
  scheduler = new Simple<IActor>();

  isRunning: boolean = false;

  constructor() {
    this.run();
  }

  add(actor: IActor) {
    this.scheduler.add(actor, false);
  }

  async run() {
    if (this.isRunning) {
      return;
    }

    this.isRunning = true;
    // eslint-disable-next-line no-constant-condition
    while (this.isRunning) {
      const actor: IActor | null = this.scheduler.next();
      if (actor === null) {
        // eslint-disable-next-line no-await-in-loop
        await delay(100);
        // eslint-disable-next-line no-continue
        continue;
      }
      // eslint-disable-next-line no-await-in-loop
      if (await actor.act()) {
        this.add(actor);
      }
    }
  }

  async stop() {
    this.isRunning = false;
  }
}
