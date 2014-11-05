(function() {
	'use strict';

	angular
	    .module('redemptionApp')
	    .factory('gameredemption', ['$resource', gameredemption]);

	function gameredemption($resource) {
		return $resource('/api/game-redemption/:id', {}, {
			update: { method: 'PUT', params: { id: '@id' } }
		});
	}
})();