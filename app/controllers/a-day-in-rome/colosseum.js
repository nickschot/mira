import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import fade from 'ember-animated/transitions/fade';
import move from 'ember-animated/motions/move';
import { task, timeout } from 'ember-concurrency';

const CODE_SNIPPETS = [
  // css
  {
    language: 'handlebars',
    snippet: `// component
  @tracked queue = [];
  @tracked group = [1, 2, 3, 4, 5, 6, 7, 8];

  // template
  <div class="queue">
    {{#each this.queue as |miraNumber|}}
      <Mira {{on "click" (fn this.toGroup miraNumber)}} />
    {{/each}}
  </div>

  <div class="group">
    {{#each this.group as |miraNumber|}}
      <Mira {{on "click" (fn this.toQueue miraNumber)}} />
    {{/each}}
  </div>`,
  },
  {
    language: 'handlebars',
    snippet: `// component
  @tracked queue = [];
  @tracked group = [1, 2, 3, 4, 5, 6, 7, 8];

  // template
  <div local-class="queue {{if this.covid "covid"}}">
    {{#animated-each this.queue use=this.transitionQueue duration=2000 as |miraNumber|}}
      <Mira {{on "click" (fn this.toGroup miraNumber)}} />
    {{/animated-each}}
  </div>

  <div local-class="group">
    {{#animated-each this.group use=this.transitionGroup duration=2000 as |miraNumber|}}
      <Mira {{on "click" (fn this.toQueue miraNumber)}} />
    {{/animated-each}}
  </div>`,
  },
  {
    language: 'javascript',
    snippet: `import move from 'ember-animated/motions/move';

  *transitionQueue({ keptSprites }) {
    keptSprites.forEach(move);
  }

  *transitionGroup({ keptSprites, sentSprites, receivedSprites }) {
    [...keptSprites, ...sentSprites, ...receivedSprites].forEach(move);
  }`,
  },
  {
    language: 'javascript',
    snippet: `import move from 'ember-animated/motions/move';

  *transitionQueue({ keptSprites, removedSprites }) {
    keptSprites.forEach(move);
    removedSprites.forEach((sprite) => {
      sprite.endTranslatedBy(-400, 0);
      move(sprite);
    });
  }

  *transitionGroup({ keptSprites, sentSprites, receivedSprites }) {
    [...keptSprites, ...sentSprites, ...receivedSprites].forEach(move);
  }`,
  },
];

export default class ADayInRomeColosseumController extends Controller {
  @service('-ea-motion') motion;

  fade = fade;

  @tracked step = 0;
  @tracked drop = true;
  @tracked animate = false;
  @tracked showCode = false;
  @tracked showFlip = false;

  get duration() {
    return this.animate ? 2000 : 0;
  }

  get currentCodeSnippet() {
    return CODE_SNIPPETS[this.step];
  }

  get hasSnippet() {
    return Boolean(
      this.currentCodeSnippet?.snippet || this.currentCodeSnippet?.list
    );
  }

  // eslint-disable-next-line require-yield
  *transitionGroup({ keptSprites, sentSprites, receivedSprites }) {
    [...keptSprites, ...sentSprites, ...receivedSprites].forEach(move);
  }

  // eslint-disable-next-line require-yield
  *transitionQueue({ keptSprites, removedSprites }) {
    keptSprites.forEach(move);
    removedSprites.forEach((sprite) => {
      sprite.endTranslatedBy(-400, 0);
      move(sprite);
    });
  }

  @tracked group = [1, 2, 3, 4, 5, 6, 7, 8];
  @tracked queue = [];

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

  @action
  previous() {
    if (this.step > 0) {
      this.step--;
    }
  }

  @action
  next() {
    if (this.step < CODE_SNIPPETS.length - 1) this.step++;
  }

  get nextDisabled() {
    return this.step >= CODE_SNIPPETS.length - 1;
  }

  @task
  *dropTask() {
    yield timeout(5000);
    this.drop = false;
  }
}
