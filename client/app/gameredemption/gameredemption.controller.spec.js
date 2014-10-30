'use strict';

describe('Controller: GameredemptionCtrl', function () {

  // load the controller's module
  beforeEach(module('redemptionApp'));

  var GameredemptionCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GameredemptionCtrl = $controller('GameredemptionCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
