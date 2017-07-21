(function () {
    function mapCtrl($scope, calcService, $mdDialog) {
        $scope.stages = [
            "assets/images/1flag.svg",
            "assets/images/2flags.svg",
            "assets/images/3flags.svg",
            "assets/images/4flags.svg"
        ]
        $scope.data = calcService.data;
        $scope.data.paused = true;
        $scope.cancel = function() {
                $mdDialog.cancel();
        };
        $scope.ok = function() {
            $scope.data.paused = false;
        }
    }
    angular.module('retirementRoad').controller("mapCtrl", ["$scope", "calculationService", "$mdDialog", mapCtrl])
})();