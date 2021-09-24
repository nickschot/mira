import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | a-day-in-rome/colosseum', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:a-day-in-rome/colosseum');
    assert.ok(route);
  });
});
