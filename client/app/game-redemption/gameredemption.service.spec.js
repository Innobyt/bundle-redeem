'use strict';

describe('Service: gameredemption', function () {

  // load the service's module
  beforeEach(module('redemptionApp'));

  // instantiate service
  var gameredemption;
  beforeEach(inject(function (_gameredemption_) {
    gameredemption = _gameredemption_;
  }));

  it('should do something', function () {
    expect(!!gameredemption).toBe(true);
  });

});
