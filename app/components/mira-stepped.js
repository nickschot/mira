import Component from '@glimmer/component';
import { task, timeout } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

const LOOK_OPTIONS = [
  'left',
  'right',
  'up',
  'center',
  'tilt-left',
  'tilt-right',
];

export default class MiraSteppedComponent extends Component {
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

  get classNames() {
    let classes = [];

    for (let i = 0; i <= this.args.step; i++) {
      classes.push(`step-${i}`);
    }

    return classes.join(' ');
  }

  @task
  *blinkTask() {
    while (true) {
      yield timeout(2500 + Math.random() * 2500);
      if (this.args.step >= 38) {
        this.eyesClosed = true;
        yield timeout(250);
        this.eyesClosed = false;
      }
    }
  }

  @task
  *cycleTask() {
    try {
      while (true) {
        yield timeout(1000 + Math.random() * 7000);
        if (/*this.args.step === 32 || */ this.args.step > 38) {
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
