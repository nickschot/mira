import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import fade from 'ember-animated/transitions/fade';
import { fadeOut, fadeIn } from 'ember-animated/motions/opacity';
import { wait } from 'ember-animated';
import { assert } from '@ember/debug';

const CODE_SNIPPETS = [
  // css
  {
    title: 'Basic shape',
    snippet: `.mira {
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  }`,
    language: 'css',
    steps: [2, 3],
  },
  {
    title: 'Body',
    snippet: `.body {
    width: 100%;
    height: 100%;
    background: rgba(224, 78, 57, 1);
  }`,
    language: 'css',
    steps: [5, 6],
  },
  {
    title: 'Body',
    snippet: `.body {
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
    box-shadow: inset 0 0 1px 0 rgba(255, 255, 255, 0.25),
                inset 0 0 calc(var(--mira-size) * 0.5) 0 #fff;
  }`,
    language: 'css',
    steps: [7, 8],
  },
  {
    title: 'Head',
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
    title: 'Head',
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
    title: 'Head',
    snippet: `.head {
    border-radius: 0 0 50% 50% / 0 0 20% 20%;
  }`,
    language: 'css',
    steps: [13, 14],
  },
  {
    title: 'Head',
    snippet: `.mira {
    overflow: hidden;
  }`,
    language: 'css',
    steps: [15, 16],
  },
  {
    title: 'Finishing touches',
    snippet: `.head {
    box-shadow: 0 0 2px 0 rgba(0,0,0,0.5),
                inset 0 0 5px 0 rgba(0,0,0,0.5);
  }`,
    language: 'css',
    steps: [17, 18],
  },
  {
    title: 'Finishing touches',
    snippet: `.body {
    transform: scale(0.975);
  }`,
    language: 'css',
    steps: [19, 20],
  },
  {
    title: 'Eyes',
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
    title: 'Eyes',
    snippet: `.eye {
    border-radius: 100%;
  }`,
    language: 'css',
    steps: [23, 24],
  },
  // animations
  {
    title: 'Animating Mira',
    steps: [25],
  },
  {
    title: 'Blinking - CSS Transitions',
    steps: [26],
    list: [
      'Transition between states',
      'Runs with state changes of CSS selector',
      'Adding/removing a class',
      'Pseudo-selectors like :hover',
    ],
  },
  {
    title: 'Blinking - CSS Transitions',
    steps: [27],
    language: 'css',
    snippet: `.eye {
    box-shadow: inset 0 0 0 rgba(255,255,255,0.85);
  }

  .eye.closed {
    box-shadow:
     inset 0 var(--eye-size) var(--eye-size) var(--eye-size) #fff;
  }
  `,
  },
  {
    title: 'Blinking - CSS Transitions',
    steps: [28, 29],
    language: 'css',
    snippet: `.eye {
    box-shadow: inset 0 0 0 rgba(255,255,255,0.85);
    transition: box-shadow 150ms ease;
  }

  .eye.closed {
    box-shadow:
     inset 0 var(--eye-size) var(--eye-size) var(--eye-size) #fff;
  }
  `,
  },
  {
    title: 'Blinking - ember-concurrency',
    steps: [30],
    language: 'javascript',
    snippet: `export default class Mira extends Component {
    @tracked eyesClosed = false;

    constructor() {
      super(...arguments);

      this.blinkTask.perform();
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
  }`,
  },
  {
    title: 'Blinking - ember-concurrency',
    steps: [31, 32],
    language: 'handlebars',
    snippet: `<div class="head">
    <div class="eye left {{if this.eyesClosed "closed"}}"></div>
    <div class="eye right {{if this.eyesClosed "closed"}}"></div>
  </div>`,
  },
  {
    title: 'CSS Transitions',
    steps: [33],
    list: ['Simple', 'Performant', 'Limited control'],
  },
  {
    title: 'Body - CSS Animations',
    steps: [34],
    list: [
      'More control over timing and easing',
      'Allows more complicated effects',
      'Specification through keyframes',
    ],
  },
  {
    title: 'Body - CSS Animations',
    steps: [35, 36],
    language: 'css',
    snippet: `@keyframes pulse-background {
    from {
      background: red;
    }

    to {
      background: blue;
    }
  }

  .body {
    animation: background-pulse infinite 4s
  }
  `,
  },
  {
    title: 'Body - CSS Animations',
    steps: [37, 38],
    language: 'css',
    snippet: `@keyframes background-pulse {
    0% {
      background: red;
    }

    50% {
      background: blue;
    }

    100% {
      background: red;
    }
  }

  .body {
    animation: background-pulse infinite 4s
  }
  `,
  },
  {
    title: 'Body - CSS Animations',
    steps: [39, 40],
    language: 'css',
    snippet: `/* animate amount of blur on the white box-shadow */
  @keyframes pulse {
    0% {
      box-shadow: inset 0 0 1px 0 rgba(255,255,255,0.25),
                  inset 0 0 calc(var(--mira-size) * 0.65) 0 #fff;
    }
    50% {
      box-shadow: inset 0 0 1px 0 rgba(255,255,255,0.25),
                  inset 0 0 calc(var(--mira-size) * 0.25) 0 #fff;
    }
    100% {
      box-shadow: inset 0 0 1px 0 rgba(255,255,255,0.25),
                  inset 0 0 calc(var(--mira-size) * 0.65) 0 #fff;
    }
  }`,
  },
];

const CODE_SNIPPETS_PER_STEP = CODE_SNIPPETS.reduce(
  (result, { steps, ...rest }) => {
    for (let step of steps) {
      assert(`Step ${step} was already defined!`, !result.has(step));

      result.set(step, { ...rest });
    }
    return result;
  },
  new Map()
);

export default class CreationController extends Controller {
  queryParams = ['step'];
  @tracked step = 0;

  fade = fade;

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
