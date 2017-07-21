(function() {

    function backgroundController($scope, $interval)
    {
        var moveTick = function() {
            $scope.moveTick = true;
            $scope.moveTick = false;
        }

        $interval(moveTick, 1000);
    }

    angular.module("retirementRoad").controller("backgroundController", backgroundController);
})();