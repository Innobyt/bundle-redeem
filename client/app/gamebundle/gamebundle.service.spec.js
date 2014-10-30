'use strict';

describe('Service: gamebundle', function () {

  // load the service's module
  beforeEach(module('redemptionApp'));

  // instantiate service
  var gamebundle;
  beforeEach(inject(function (_gamebundle_) {
    gamebundle = _gamebundle_;
  }));

  it('should do something', function () {
    expect(!!gamebundle).toBe(true);
  });

});
