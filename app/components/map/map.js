(function () {
    function mapCtrl($scope) {
        $scope.stages = [
            "assets/images/1flag.svg",
            "assets/images/2flag.svg",
            "assets/images/3flag.svg",
            "assets/images/4flag.svg"
        ]
        $scope.stage = 0;
    }
    angular.module('retirementRoad').controller("mapCtrl", ["$scope", mapCtrl])
})();