'use strict';

describe('Controller: GamebundleCtrl', function () {

  // load the controller's module
  beforeEach(module('redemptionApp'));

  var GamebundleCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GamebundleCtrl = $controller('GamebundleCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
