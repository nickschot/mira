import EmberRouter from '@ember/routing/router';
import config from 'mira/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('interactive');
  this.route('creation');
  this.route('a-day-in-rome', function () {
    this.route('espresso');
    this.route('colosseum');
    this.route('italy', function () {
      this.route('vatican');
    });
  });
  this.route('coming-soon-tm');
});
