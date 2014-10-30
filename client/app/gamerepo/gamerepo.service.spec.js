'use strict';

describe('Service: gamerepo', function () {

  // load the service's module
  beforeEach(module('redemptionApp'));

  // instantiate service
  var gamerepo;
  beforeEach(inject(function (_gamerepo_) {
    gamerepo = _gamerepo_;
  }));

  it('should do something', function () {
    expect(!!gamerepo).toBe(true);
  });

});
