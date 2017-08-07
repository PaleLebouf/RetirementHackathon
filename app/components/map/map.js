(function () {
    function mapCtrl($scope, calcService, $mdDialog) {
        $scope.stages = [
            "assets/images/1flag.svg",
            "assets/images/2flags.svg",
            "assets/images/3flags.svg",
            "assets/images/4flags.svg"
        ]
        $scope.data = calcService.data;
        
        $scope.ok = function() {
            $scope.data.paused = false;
            $mdDialog.cancel();
        }
    }
    angular.module('retirementRoad').controller("mapCtrl", ["$scope", "calculationService", "$mdDialog", mapCtrl])
})();