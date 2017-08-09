(function () {
    function gameCtrl($scope, calcService, eventService) {
        calcService.startGame();

        $scope.$watch("data.debt", function(newValue, oldValue, scope) {
            if (newValue <= 0) {
                eventService.showDebtPaidOff()
                $scope.data.stage++;
            }
        });
    }
    angular.module('retirementRoad').controller("gameCtrl", ["$scope", "calculationService", "eventService", gameCtrl])
})();