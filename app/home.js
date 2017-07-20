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
