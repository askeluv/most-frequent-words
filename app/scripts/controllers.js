'use strict';

angular.module('controllers', []).
    controller('mfwListCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
        $scope.lang = "español";

        $scope.words = [{word:'de', rank:1, examples:['Soy de Madrid','De nada','De aqui para alla']},
            {word:'para', rank:2, examples:['Para ya','Para que quieres eso?','Para para aaguaaas']},
            {word:'casa', rank:3, examples:['Telefono, mi casa','El chico se casa mañana','Casa casa .. casablanca!']},
            {word:'roca', rank:4, examples:['Hay rocas en el mar','Mi amigo Roca','Roca roca, .. roca and roll!']}];

        var wRank = $routeParams.rank;
        $scope.exampleId = +$routeParams.id;
        $scope.w = $scope.words[wRank-1];
        $scope.wordsLength = $scope.words.length;
        $scope.examplesLength = $scope.w ? $scope.w.examples.length : null;
    }]);