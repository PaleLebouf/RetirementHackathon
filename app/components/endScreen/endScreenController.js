(function (){
function endScreenController($scope, $interval, $mdDialog, calculationService)
    {
        $scope.reset = function() {
            $mdDialog.cancel();
            window.location.href ="/#!/profile";
            window.location.reload();
        };

        $scope.calculationService = calculationService;
    };

    angular.module('retirementRoad').controller('endScreenController', endScreenController);
})();