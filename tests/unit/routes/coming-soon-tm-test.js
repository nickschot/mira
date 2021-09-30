import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | coming-soon-tm', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:coming-soon-tm');
    assert.ok(route);
  });
});
