'use strict';

var ARROW_LEFT = 37;
var ARROW_UP = 38;
var ARROW_RIGHT = 39;
var ARROW_DOWN = 40;
var NUMBER_OF_WORDS = 100;
var NUMBER_OF_EXAMPLES = 3;

angular.module('controllers', [])
	.controller('mfwListCtrl', ['$routeParams', '$location', '$http', function ($routeParams, $location, $http) {
		var controller = this;

		controller.words = {};
		$http.get('../../data/spanish.json').success(function(data) {
			controller.words = data;
			controller.onDataLoaded();
		});

		controller.wordsLength = NUMBER_OF_WORDS;
		controller.examplesLength = NUMBER_OF_EXAMPLES;

        //////////////////////////////////////////////
        ///////////////// FUNCTIONS //////////////////
        //////////////////////////////////////////////

        this.keyUp = function(keyEvent) {
            var wordRank = +$routeParams.rank;
            var exampleId = $routeParams.id ? +$routeParams.id : -1;

            switch(keyEvent.keyCode)
            {
                case ARROW_LEFT:
                    if(exampleId !== -1){
                        this.navigateLeft(wordRank, exampleId);
                    }
                    break;
                case ARROW_UP:
                    if(wordRank > 1 && exampleId === -1) {
                        this.navigateUp(wordRank);
                    }
                    break;
                case ARROW_RIGHT:
                    if(exampleId < NUMBER_OF_EXAMPLES-1){
                        this.navigateRight(wordRank, exampleId);
                    }
                    break;
                case ARROW_DOWN:
                    if(wordRank < NUMBER_OF_WORDS && exampleId === -1) {
                        this.navigateDown(wordRank);
                    }
                    break;
            }
        };

        this.navigateLeft = function(wordRank, exampleId) {
            if(exampleId === 0){
                this.go('/word/'+ wordRank);
            }else{
                this.go('/word/'+ wordRank +'/sentences/'+ (exampleId - 1));
            }
        };

        this.navigateUp = function(wordRank) {
            this.go('/word/'+ (wordRank - 1));
        };

        this.navigateRight = function(wordRank, exampleId) {
            this.go('/word/'+ wordRank +'/sentences/'+ (exampleId + 1));
        };

        this.navigateDown = function(wordRank) {
            this.go('/word/'+ (wordRank + 1));
        };

        this.go = function (path) {
            $location.path(path);
        };

		this.onDataLoaded = function() {
			if($routeParams.rank){
				var wRank = $routeParams.rank;
				this.exampleId = +$routeParams.id;
				this.currentWord = this.words[wRank-1];
			}
		};

    }]);