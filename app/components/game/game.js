(function () {
    function gameCtrl($scope, calcService) {
        calcService.startGame();
    }
    angular.module('retirementRoad').controller("gameCtrl", ["$scope", "calculationService", gameCtrl])
})();