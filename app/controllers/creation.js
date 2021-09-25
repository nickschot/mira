import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import fade from 'ember-animated/transitions/fade';
import { fadeOut, fadeIn } from 'ember-animated/motions/opacity';
import { wait, printSprites } from 'ember-animated';
import { assert } from '@ember/debug';
import { SnippetResize } from '../motions/snippet-resize';

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
    title: 'CSS Transitions',
    steps: [26],
    list: [
      'Transition between states',
      'Runs with state changes of CSS selector',
      'Adding/removing a class',
      'Pseudo-selectors like :hover',
      'Limited control over timing function',
    ],
  },
  {
    title: 'Looking around - CSS Transitions',
    steps: [27],
    list: [
      'Add some controls for looking up, sideways and tilting',
      'Argument that adds a class to Mira',
      'i.e. `class="up"` for looking up',
    ],
    language: 'css',
  },
  {
    title: 'Looking up - CSS Transitions',
    steps: [28],
    snippet: `.head.up {
    border-radius: 0 0 50% 50% / 0 0 0 0;
    transform: translateY(-15%);
  }`,
    language: 'css',
  },
  {
    title: 'Looking up - CSS Transitions',
    steps: [29],
    snippet: `.head {
    border-radius: 0 0 50% 50% / 0 0 20% 20%;
    transition: transform 1s, border-radius 1s;
  }

  .head.up {
    border-radius: 0 0 50% 50% / 0 0 0 0;
    transform: translateY(-15%);
  }`,
    language: 'css',
  },
  {
    title: 'Looking left & right - CSS Transitions',
    steps: [30],
    snippet: `.head.left {
    transform: rotate(30deg);
    border-radius: 0 0 50% 50% / 0 0 40% 80%;
  }

  .head.right {
    transform: rotate(-30deg);
    border-radius: 0 0 50% 50% / 0 0 80% 40%;
  }`,
    language: 'css',
  },
  {
    title: 'Tilting left & right - CSS Transitions',
    steps: [31],
    snippet: `.head.tilt-left {
    transform: rotate(-15deg) translate(-10%, -8%);
    border-radius: 0 0 50% 50% / 0 0 20% 20%;
  }

  .head.tilt-right {
    transform: rotate(15deg) translate(10%, -8%);
    border-radius: 0 0 50% 50% / 0 0 20% 20%;
  }`,
    language: 'css',
  },
  {
    title: 'Blinking - CSS Transitions',
    steps: [33],
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
    steps: [34, 35],
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
    steps: [36],
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
    steps: [37, 38],
    language: 'handlebars',
    snippet: `<div class="head">
    <div class="eye left {{if this.eyesClosed "closed"}}"></div>
    <div class="eye right {{if this.eyesClosed "closed"}}"></div>
  </div>`,
  },
  {
    title: 'CSS Transitions',
    steps: [39],
    list: ['Simple', 'Performant', 'Limited control'],
  },
  {
    title: 'CSS Animations',
    steps: [40],
    list: [
      'More control over timing and easing',
      'Allows more complicated effects',
      'Specification through keyframes',
    ],
  },
  {
    title: 'Body - CSS Animations',
    steps: [41, 42],
    language: 'css',
    snippet: `@keyframes background-pulse {
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
    steps: [43, 44],
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
    steps: [45, 46],
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
  {
    title: 'Keyframes - CSS Animations',
    steps: [48],
    list: [
      'With a linear easing, they are basically "frames"',
      'Possibility for completely custom timings',
    ],
  },
  {
    title: 'Jump! - CSS Animations',
    steps: [49, 50],
    language: 'css',
    snippet: `.shadow {
    position: absolute;
    bottom: 0;
    left: 10%;

    width: 80%;
    height: 15%;

    border-radius: 100%;
    background: black;
  }`,
  },
  {
    title: 'Jump! - CSS Animations',
    steps: [51, 52],
    language: 'css',
    snippet: `.shadow {
    ...

    opacity: 0.5;
    filter: blur(25px);
    transform-origin: center;
    transform: translateZ(0);
  }`,
  },
  {
    title: 'Jump! - CSS Animations',
    steps: [53],
    language: 'css',
    snippet: `@jump {
    /* preparing */
    0%   { transform: translateY(0) scale(1,1);         }
    20%  { transform: translateY(0) scale(1.05, 0.95);  }
    30%  { transform: translateY(0) scale(1, 1);        }

    /* going upwards */

    45%  { transform: translateY(-15%) scale(0.95, 1.05); }
    50%  { transform: translateY(-17%) scale(0.95, 1.05); }
    55%  { transform: translateY(-17%) scale(0.95, 1.05); }

    /* going downwards */

    /* landing */
    75%  { transform: translateY(0) scale(0.95, 1.05);  }
    85%  { transform: translateY(0) scale(1.025, 0.95); }
    100% { transform: translateY(0) scale(1,1);         }
  }

  .mira.jump {
    animation: jump linear 1.25s;
  }`,
  },
  {
    title: 'Jump! - CSS Animations',
    steps: [54],
    language: 'css',
    snippet: `@jump-shadow {
    0%   { transform: scale(1);    }
    30%  { transform: scale(1);    }
    45%  { transform: scale(1.15);  }
    50%  { transform: scale(1.17); }
    55%  { transform: scale(1.17); }
    75%  { transform: scale(1);    }
    100% { transform: scale(1);    }
  }

  .shadow.jump {
    animation: jump-shadow linear 1.25s;
  }`,
  },
];

export default class CreationController extends Controller {
  queryParams = ['step'];
  @tracked step = 0;
  @tracked _look;
  @tracked jump = false;

  get showLookControls() {
    return (this.step >= 27 && this.step <= 31) || this.step >= 49;
  }

  get look() {
    if (this.showLookControls) {
      return this._look;
    }

    return undefined;
  }

  fade = fade;

  containerMotion = SnippetResize;

  *snippetTransition({ insertedSprites, removedSprites }) {
    if (removedSprites.length) {
      removedSprites.forEach(fadeOut);
      yield wait(500);
    } else {
      yield wait(500);
      insertedSprites.forEach(fadeIn);
    }
  }

  get currentCodeSnippet() {
    return CODE_SNIPPETS.find((item) => item.steps?.includes(this.step));
  }

  get hasSnippet() {
    return Boolean(
      this.currentCodeSnippet?.snippet || this.currentCodeSnippet?.list
    );
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

  @action
  toggleJump() {
    this.jump = !this.jump;
  }
}
