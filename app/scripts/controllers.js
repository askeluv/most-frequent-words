'use strict';

angular.module('controllers', []).
    controller('mfwListCtrl', function ($scope) {
        console.log("H");
        $scope.lang = "español";

        $scope.words = [{word:'de', rank:1, examples:['Soy de Madrid','De nada','De aqui para alla']},
            {word:'para', rank:2, examples:['Para ya','Para que quieres eso?','Para para aaguaaas']},
            {word:'casa', rank:3, examples:['Telefono, mi casa','El chico se casa mañana','Casa casa .. casablanca!']},
            {word:'roca', rank:4, examples:['Hay rocas en el mar','Mi amigo Roca','Roca roca, .. roca and roll!']}];

        $scope.translateRankToPosition = function(rank) {
            var w=window,
                d=document,
                e=d.documentElement,
                g=d.getElementsByTagName('body')[0],
                x=w.innerWidth||e.clientWidth||g.clientWidth,
                y=w.innerHeight||e.clientHeight||g.clientHeight;
            return (rank-1)*y;
        };

        $scope.keyPressed = function(keyCode){
          console.log("keyCode:");
          console.log(keyCode);
        };
    });