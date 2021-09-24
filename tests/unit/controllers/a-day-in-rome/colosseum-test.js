import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | a-day-in-rome/colosseum', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:a-day-in-rome/colosseum');
    assert.ok(controller);
  });
});
