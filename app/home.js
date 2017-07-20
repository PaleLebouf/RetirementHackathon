<<<<<<< HEAD
var app = angular.module("retirementRoad", ["ngMaterial", "ngRoute"])
app.config(['$routeProvider', '$locationProvider',
 function ($routeProvider) {
     $routeProvider
       .when('/start', {
           templateUrl: 'components/start/start.html',
           controller: 'startCtrl'
       })
       .when('/game', {
           templateUrl: 'components/game/game.html',
           controller: 'gameCtrl'
       })
       .otherwise('/start');   
}]);
=======
var app = angular.module("retirementRoad", ["ngMaterial"]);

app.controller("homeCtrl", ["$scope", function($scope) {
    $scope.hello = "Hello";
}]);
>>>>>>> 00bc58409291873e63b908a3f8ba598fbe2ce41c
