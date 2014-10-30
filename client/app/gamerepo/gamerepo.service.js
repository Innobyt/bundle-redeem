(function() {
	'use strict';

	angular
	    .module('redemptionApp')
	    .factory('gamerepo', ['$resource', gamerepo]);

	function gamerepo($resource) {
		return $resource('/api/gamerepo/:id', {}, {
			update: { method: 'PUT', params: { id: '@id' } }
		});
	}
})();