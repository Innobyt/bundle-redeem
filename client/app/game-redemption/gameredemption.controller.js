(function() {
	'use strict';

	angular.module('redemptionApp')
	  .controller('GameredemptionCtrl', ['$scope', 'gameredemption', GameredemptionCtrl]);

	function GameredemptionCtrl($scope, gameredemption) {
	    $scope.submit = function() { $scope.formData.$save(function(){ $scope.initialize(); }); };
		$scope.initialize = function(){ $scope.formData = new gameredemption(); };
		$scope.initialize();
	};
})();