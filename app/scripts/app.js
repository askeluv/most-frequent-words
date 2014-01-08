'use strict';

var mfwApp = angular.module('mfwApp', [
    'ngRoute',
    'controllers'
]);

mfwApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/', {templateUrl: 'views/mfw-list.html', controller: 'mfwListCtrl'});
        $routeProvider.otherwise({redirectTo: '/'});
    }]);