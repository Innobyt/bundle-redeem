(function() {
	'use strict';

	angular
	    .module('redemptionApp')
	    .factory('gamebundle', ['$resource', gamebundle]);

	function gamebundle($resource) {
		return $resource('/api/gamebundle/:id', {}, {
			update: { method: 'PUT', params: { id: '@id' } }
		});
	}
})();