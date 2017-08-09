(function() {

    function negativeEventController($scope, $mdDialog, eventService, calculationService)
    {
        $scope.event = eventService.activeEvent;
        $scope.calculationService = calculationService;
        $scope.remainder = 0;
        $scope.isExpenseCovered = $scope.remainder <= 0;
        $scope.isExpenseNotCovered = $scope.remainder > 0;

        $scope.initEvent = function() {
            $scope.preEventSavings = calculationService.data.savings;
            
            $scope.eventCost = $scope.event.getCost();
            balance = $scope.preEventSavings > 0 ? $scope.preEventSavings - $scope.eventCost : $scope.eventCost;
            $scope.remainder = (balance > 0) ? 0 : balance;
            //calculationService.data.savings = (balance < 0) ? 0 : balance;
        }

        $scope.ok = function() {
            eventService.showMap();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };
    };

    angular.module('retirementRoad').controller('negativeEventController', negativeEventController);
})();