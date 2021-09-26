import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import move from 'ember-animated/motions/move';
import { task, timeout } from 'ember-concurrency';

export default class ADayInRomeColosseumController extends Controller {
  @service('-ea-motion') motion;

  // eslint-disable-next-line require-yield
  *transition({ keptSprites, sentSprites, receivedSprites, removedSprites }) {
    keptSprites.forEach((sprite) => {
      //sprite.applyStyles({ background: 'blue' });
      move(sprite);
    });
    sentSprites.forEach((sprite) => {
      sprite.applyStyles({
        //background: 'red',
        'z-index': '1',
      });
      move(sprite);
    });
    receivedSprites.forEach((sprite) => {
      sprite.applyStyles({
        //background: 'yellow',
        'z-index': '2',
      });
      move(sprite);
    });
    removedSprites.forEach((sprite) => {
      //sprite.applyStyles({ background: 'green' });
      sprite.endTranslatedBy(-400, 0);
      //continuePrior(sprite);
      move(sprite);
    });
  }

  @tracked group = [1, 2, 3, 4, 5, 6, 7, 8];
  @tracked queue = [];
  @tracked drop = true;

  @action
  toQueue(miraInstance) {
    let inGroup = this.group.indexOf(miraInstance) >= 0;
    if (inGroup && this.queue.indexOf(miraInstance) < 0) {
      this.group.splice(this.group.indexOf(miraInstance), 1);
      this.group = [...this.group];
      this.queue = [...this.queue, miraInstance];
    }
  }

  @action
  toGroup(miraInstance) {
    let inQueue = this.queue.indexOf(miraInstance) >= 0;
    if (inQueue) {
      this.queue.splice(this.queue.indexOf(miraInstance), 1);
      this.queue = [...this.queue];
      this.group = [...this.group, miraInstance];
    }
  }

  @action
  allowEntry() {
    if (this.queue.length) {
      this.queue = this.queue.slice(1);
    }
  }

  @task
  *dropTask() {
    yield timeout(5000);
    this.drop = false;
  }
}
