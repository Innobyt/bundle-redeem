'use strict';

describe('Controller: GamerepoCtrl', function () {

  // load the controller's module
  beforeEach(module('redemptionApp'));

  var GamerepoCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GamerepoCtrl = $controller('GamerepoCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
