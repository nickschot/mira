import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { fadeOut, fadeIn } from 'ember-animated/motions/opacity';
import { wait } from 'ember-animated';
import { assert } from '@ember/debug';

const CODE_SNIPPETS = [
  {
    snippet: `border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;`,
    steps: [2, 3],
  },
];

const CODE_SNIPPETS_PER_STEP = CODE_SNIPPETS.reduce(
  (result, { snippet, steps }) => {
    for (let step of steps) {
      assert(`Step ${step} was already defined!`, !result.has(step));

      result.set(step, snippet);
    }

    return result;
  },
  new Map()
);

export default class CreationController extends Controller {
  queryParams = ['step'];
  @tracked step = 0;

  *transition({ insertedSprites, removedSprites }) {
    if (insertedSprites.length) {
      yield wait(500);
      insertedSprites.forEach(fadeIn);
    } else {
      removedSprites.forEach(fadeOut);
    }
  }

  get currentCodeSnippet() {
    return CODE_SNIPPETS_PER_STEP.get(this.step);
  }

  @action
  previousStep() {
    if (this.step > 0) {
      this.step--;
    }
  }

  @action
  nextStep() {
    this.step++;
  }
}
