import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import fade from 'ember-animated/transitions/fade';

export default class ADayInRomeEspressoController extends Controller {
  @tracked showCode = false;
  @tracked getEspresso = false;

  fade = fade;
  css = `.mira {
  position: absolute;
  right: calc(100% - var(--mira-size) - 50px);
  top: calc(100% - var(--mira-size) - 50px);
  transition: all 3s linear;
  transform-origin: bottom center;
}

.mira.espresso {
  right: -300px;
  top: 150px;
  transform: scale(0.5);
}`;

  @action
  toggleCode() {
    this.showCode = !this.showCode;
  }

  @action
  toggleEspresso() {
    this.getEspresso = !this.getEspresso;
  }
}
