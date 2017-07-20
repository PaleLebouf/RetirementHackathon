var app = angular.module("retirementRoad", ["ngMaterial", "ngRoute",'ui.odometer'])
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
       .when('/pause', {
           templateUrl: 'components/map/map.html',
           controller: 'mapCtrl'
       })
       .otherwise('/start');   
}]);
