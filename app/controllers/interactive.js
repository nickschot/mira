import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class InteractiveController extends Controller {
  @tracked look;
  @tracked jump = false;

  @action
  toggleJump() {
    this.jump = !this.jump;
  }

  smallMiras = [...Array(12)];
}
