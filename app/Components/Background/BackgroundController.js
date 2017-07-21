(function() {

    function backgroundController($scope, $interval)
    {
        var swapImage = function() {
            
            if($scope.image == "one")
                $scope.image = "two";
            else if ($scope.image == "two")
                $scope.image = "one";
        }

        $scope.image = "one";

        $interval(swapImage, 2000);
    }

    angular.module("retirementRoad").controller("backgroundController", backgroundController);
})();