(function () {
    function mapCtrl($scope, calcService) {
        $scope.stages = [
            "assets/images/1flag.svg",
            "assets/images/2flags.svg",
            "assets/images/3flags.svg",
            "assets/images/4flags.svg"
        ]
        $scope.data = calcService.data;
        $scope.data.paused = true;
    }
    angular.module('retirementRoad').controller("mapCtrl", ["$scope", "calculationService", mapCtrl])
})();