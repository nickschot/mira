import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import fade from 'ember-animated/transitions/fade';
import { fadeOut, fadeIn } from 'ember-animated/motions/opacity';
import { wait } from 'ember-animated';
import { assert } from '@ember/debug';

const CODE_SNIPPETS = [
  {
    snippet: `border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;`,
    language: 'css',
    steps: [2, 3],
  },
  {
    snippet: `width: 100%;
  height: 100%;
  background: rgba(224, 78, 57, 1);
    `,
    language: 'css',
    steps: [5, 6],
  },
  {
    snippet: `border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  box-shadow: inset 0 0 1px 0 rgba(255, 255, 255, 0.25),
              inset 0 0 calc(var(--mira-size) * 0.5) 0 #fff;
    `,
    language: 'css',
    steps: [7, 8],
  },
  {
    snippet: `.head {
    position: absolute;
    background: #FFF;
    top: 0;
    left: 0;
    width: 100%;
    height: 80%;
  }`,
    language: 'css',
    steps: [9, 10],
  },
  {
    snippet: `.head {
    ...

    top: -40%;
    left: -25%;
    width: 150%;
    height: 120%;
  }`,
    language: 'css',
    steps: [11, 12],
  },
  {
    snippet: `.head {
    border-radius: 0 0 50% 50% / 0 0 20% 20%;
  }`,
    language: 'css',
    steps: [13, 14],
  },
  {
    snippet: `.mira {
    overflow: hidden;
  }`,
    language: 'css',
    steps: [15, 16],
  },
  {
    snippet: `.head {
    box-shadow: 0 0 2px 0 rgba(0,0,0,0.5),
                inset 0 0 5px 0 rgba(0,0,0,0.5);
  }`,
    language: 'css',
    steps: [17, 18],
  },
  {
    snippet: `.body {
    transform: scale(0.975);
  }`,
    language: 'css',
    steps: [19, 20],
  },
  {
    snippet: `.eye {
    --eye-size: calc(var(--mira-size) * 0.08);

    position: absolute;
    bottom: calc(var(--eye-size) * 0.8);
    width: var(--eye-size);
    height: var(--eye-size);
    background: #0D3349;
  }

  .eye.left {
    left: 41%;
  }

  .eye.right {
    right: 41%;
  }
  `,
    language: 'css',
    steps: [21, 22],
  },
  {
    snippet: `.eye {
    border-radius: 100%;
  }`,
    language: 'css',
    steps: [23, 24],
  },
];

const CODE_SNIPPETS_PER_STEP = CODE_SNIPPETS.reduce(
  (result, { snippet, language, steps }) => {
    for (let step of steps) {
      assert(`Step ${step} was already defined!`, !result.has(step));

      result.set(step, { snippet, language });
    }

    console.log(result);
    return result;
  },
  new Map()
);

export default class CreationController extends Controller {
  queryParams = ['step'];
  @tracked step = 0;

  *transition({ insertedSprites, removedSprites, keptSprites }) {
    if (insertedSprites.length) {
      //yield wait(500);
      insertedSprites.forEach(fadeIn);
    } else {
      removedSprites.forEach(fadeOut);
    }

    keptSprites.forEach(fade);
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
