'use strict';

/* Services */

angular.module('services', ['ngResource'])
	.factory('Words', ['$resource',
	function($resource){
		return $resource('../../data/spanish.json', {}, {
			query: {method:'GET', isArray:true}
		});
	}]);