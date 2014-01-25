'use strict';

var ARROW_LEFT = 37;
var ARROW_UP = 38;
var ARROW_RIGHT = 39;
var ARROW_DOWN = 40;
var NUMBER_OF_WORDS = 4;
var NUMBER_OF_EXAMPLES = 3;

angular.module('controllers', []).
    controller('mfwListCtrl', ['$scope', '$routeParams', '$location', function ($scope, $routeParams, $location) {
        $scope.lang = "español";

        $scope.words = [{word:'de', rank:1, examples:['Soy de Madrid','De nada','De aqui para alla']},
            {word:'para', rank:2, examples:['Para ya','Para que quieres eso?','Para para aaguaaas']},
            {word:'casa', rank:3, examples:['Telefono, mi casa','El chico se casa mañana','Casa casa .. casablanca!']},
            {word:'roca', rank:4, examples:['Hay rocas en el mar','Mi amigo Roca','Roca roca, .. roca and roll!']}];

        var wRank = $routeParams.rank;
        $scope.exampleId = +$routeParams.id;
        $scope.w = $scope.words[wRank-1];
        $scope.wordsLength = NUMBER_OF_WORDS;
        $scope.examplesLength = NUMBER_OF_EXAMPLES;

        //////////////////////////////////////////////
        ///////////////// FUNCTIONS //////////////////
        //////////////////////////////////////////////

        $scope.keyUp = function(keyEvent) {
            var wordRank = +$routeParams.rank;
            var exampleId = $routeParams.id ? +$routeParams.id : -1;

            switch(keyEvent.keyCode)
            {
                case ARROW_LEFT:
                    if(exampleId !== -1){
                        $scope.navigateLeft(wordRank, exampleId);
                    }
                    break;
                case ARROW_UP:
                    if(wordRank > 1 && exampleId === -1) {
                        $scope.navigateUp(wordRank);
                    }
                    break;
                case ARROW_RIGHT:
                    if(exampleId < NUMBER_OF_EXAMPLES-1){
                        $scope.navigateRight(wordRank, exampleId);
                    }
                    break;
                case ARROW_DOWN:
                    if(wordRank < NUMBER_OF_WORDS && exampleId === -1) {
                        $scope.navigateDown(wordRank);
                    }
                    break;
            }
        };

        $scope.navigateLeft = function(wordRank, exampleId) {
            if(exampleId === 0){
                $scope.go('/word/'+ wordRank);
            }else{
                $scope.go('/word/'+ wordRank +'/example/'+ (exampleId - 1));
            }
        };

        $scope.navigateUp = function(wordRank) {
            $scope.go('/word/'+ (wordRank - 1));
        };

        $scope.navigateRight = function(wordRank, exampleId) {
            $scope.go('/word/'+ wordRank +'/example/'+ (exampleId + 1));
        };

        $scope.navigateDown = function(wordRank) {
            $scope.go('/word/'+ (wordRank + 1));
        };

        $scope.go = function (path) {
            $location.path(path);
        };

    }]);