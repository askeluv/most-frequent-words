'use strict';

var mfwApp = angular.module('mfwApp', [
    'ngRoute',
    'controllers',
	'services',
	'directives'
]);

mfwApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
	        .when('/word/:rank', {templateUrl: 'views/mfw-list.html', controller: 'mfwListCtrl', controllerAs:'wordsCtrl'})
            .when('/word/:rank/sentences/:id', {templateUrl: 'views/mfw-example.html', controller: 'mfwListCtrl', controllerAs:'wordsCtrl'})
            .otherwise({redirectTo: '/word/1'});
    }]);