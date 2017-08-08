(function() {

    function negativeEventController($scope, $mdDialog, eventService, calculationService)
    {
        $scope.event = eventService.activeEvent;
        $scope.calculationService = calculationService;
        $scope.remainder = 0;
        $scope.isExpenseCovered = $scope.remainder <= 0;
        $scope.isExpenseNotCovered = $scope.remainder > 0;
        $scope.$watch("eventCost", function(newValue, oldValue, scope) {
            if (newValue != oldValue) {
                balance = calculationService.data.savings - $scope.eventCost;
                $scope.remainder = (balance > 0) ? 0 : balance;
                calculationService.data.savings = (balance < 0) ? 0 : balance;
            }
        });

        $scope.ok = function() {
            eventService.showMap();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };
    };

    angular.module('retirementRoad').controller('negativeEventController', negativeEventController);
})();