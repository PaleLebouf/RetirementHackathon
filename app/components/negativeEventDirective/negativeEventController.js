(function() {

    function negativeEventController($scope, $mdDialog, eventService)
    {
        $scope.ok = function() {
            eventService.showMap();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };
    };

    angular.module('retirementRoad').controller('negativeEventController', negativeEventController);
})();