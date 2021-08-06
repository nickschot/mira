import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';

export default class MiraComponent extends Component {
  @tracked eyesClosed = false;

  constructor() {
    super(...arguments);
    this.blink.perform();
  }

  @task
  *blink() {
    while (true) {
      yield timeout(5000);
      this.eyesClosed = true;
      yield timeout(250);
      this.eyesClosed = false;
    }
  }
}
