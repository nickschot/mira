import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';

const LOOK_OPTIONS = [
  'left',
  'right',
  'up',
  'center',
  'tilt-left',
  'tilt-right',
];

export default class MiraComponent extends Component {
  @tracked eyesClosed = false;
  @tracked _look;

  constructor() {
    super(...arguments);
    this.blinkTask.perform();
    this.cycleTask.perform();
  }

  get look() {
    return this.args.look ?? this._look;
  }

  @task
  *blinkTask() {
    while (true) {
      yield timeout(2500 + Math.random() * 2500);
      this.eyesClosed = true;
      yield timeout(250);
      this.eyesClosed = false;
    }
  }

  @task
  *cycleTask() {
    try {
      while (true) {
        yield timeout(1000 + Math.random() * 7000);

        if (!this.args.look) {
          this._look =
            LOOK_OPTIONS[Math.floor(Math.random() * LOOK_OPTIONS.length)];
        }
      }
    } finally {
      this._look = undefined;
    }
  }

  @task({ drop: true })
  *jumpTask() {
    yield timeout(1250);
  }
}
