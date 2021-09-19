import Component from '@glimmer/component';
import { task, timeout } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

export default class MiraSteppedComponent extends Component {
  @tracked eyesClosed = false;
  @tracked _look;
  @tracked _jump = false;

  constructor() {
    super(...arguments);

    this.blinkTask.perform();
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
      if (this.args.step > 30) {
        this.eyesClosed = true;
        yield timeout(250);
        this.eyesClosed = false;
      }
    }
  }
}
