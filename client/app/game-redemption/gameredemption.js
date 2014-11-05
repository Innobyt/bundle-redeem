'use strict';

angular.module('redemptionApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('gameredemption', {
        url: '/game-redemption',
        templateUrl: 'app/game-redemption/gameredemption.html',
        controller: 'GameredemptionCtrl'
      });
  });