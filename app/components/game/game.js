(function () {
    function gameCtrl($scope, calcService, eventService) {
        calcService.startGame();
        $scope.data = calcService.data;

        $scope.$watch("data.debt", function(newValue, oldValue, scope) {
            if (newValue <= 0) {
                eventService.showDebtPaidOff();
                calcService.data.stage++;
            }
        });
    }
    angular.module('retirementRoad').controller("gameCtrl", ["$scope", "calculationService", "eventService", gameCtrl])
})();