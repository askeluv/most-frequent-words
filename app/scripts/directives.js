'use strict';

/* Directives */

angular.module('directives', [])
	.directive('shortcutList', function() {
	    return {
		    restrict: "E",
		    templateUrl: "/app/templates/mfw-list-shortcut.html"
	    }
	  })
	.directive('listPercentage', function() {
	    return {
		    restrict: "E",
		    templateUrl: "/app/templates/mfw-percentage.html"
	    }
	  });
