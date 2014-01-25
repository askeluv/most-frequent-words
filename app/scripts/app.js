'use strict';

var mfwApp = angular.module('mfwApp', [
    'ngRoute',
    'controllers'
]);

mfwApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/word/:rank', {templateUrl: 'views/mfw-list.html', controller: 'mfwListCtrl'});
        $routeProvider.when('/word/:rank/example/:id', {templateUrl: 'views/mfw-example.html', controller: 'mfwListCtrl'});
        $routeProvider.otherwise({redirectTo: '/word/1'});
    }]);