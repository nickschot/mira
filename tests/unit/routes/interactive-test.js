import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | interactive', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:interactive');
    assert.ok(route);
  });
});
