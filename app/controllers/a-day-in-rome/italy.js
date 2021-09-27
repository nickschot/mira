import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import fade from 'ember-animated/transitions/fade';

const CODE_SNIPPETS = [
  // css
  {
    language: 'handlebars',
    snippet: `/a-day-in-rome/italy/index.hbs
  {{#animated-value "mira"}}
    <Mira />
  {{/animated-value}}

  /a-day-in-rome/italy/vatican.hbs
  {{#animated-value "mira" use=this.transition duration=10000}}
    <Mira />
  {{/animated-value}}
    `,
  },
  {
    language: 'javascript',
    snippet: `import { parallel } from 'ember-animated';
  import move from 'ember-animated/motions/move';
  import scale from 'ember-animated/motions/scale';

  *transition({ receivedSprites, sentSprites }) {

    [...receivedSprites, ...sentSprites].forEach(parallel(move, scale));

  }`,
  },
];

export default class ADayInRomeItalyController extends Controller {
  fade = fade;

  @tracked step = 0;
  @tracked showCode = false;

  get currentCodeSnippet() {
    return CODE_SNIPPETS[this.step];
  }

  get hasSnippet() {
    return Boolean(
      this.currentCodeSnippet?.snippet || this.currentCodeSnippet?.list
    );
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
}
