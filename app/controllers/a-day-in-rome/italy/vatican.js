import Controller from '@ember/controller';
import { parallel } from 'ember-animated';
import move from 'ember-animated/motions/move';
import scale from 'ember-animated/motions/scale';

export default class ADayInRomeItalyVaticanController extends Controller {
  *transition({ receivedSprites, sentSprites }) {
    [...receivedSprites, ...sentSprites].forEach(parallel(move, scale));
  }
}
