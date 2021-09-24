import Route from '@ember/routing/route';

export default class ADayInRomeColosseumRoute extends Route {
  setupController(controller) {
    super.setupController(...arguments);
    controller.group = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    controller.queue = [];
    controller.covid = false;
  }
}
