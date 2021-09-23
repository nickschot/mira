import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | animations', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:animations');
    assert.ok(route);
  });
});
