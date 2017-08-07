(function() {

    function backgroundController($scope, $interval, calculationService)
    {
        var checkStage = function(){
            if(calculationService.data.stage == 1)
            {
                $scope.staticBackground = "assets/parallaxBackgrounds/roadParallaxBG1-Cut.png";
                $scope.parallaxBackground = "assets/parallaxBackgrounds/roadParallax1-Cut.png";
            }
            else if(calculationService.data.stage == 2)
            {
                $scope.staticBackground = "assets/parallaxBackgrounds/roadParallaxBG2-Cut.png";
                $scope.parallaxBackground = "assets/parallaxBackgrounds/roadParallax2-Cut.png";
            }
            else
            {
                $scope.staticBackground = "assets/parallaxBackgrounds/roadParallaxBG3-Cut.png";
                $scope.parallaxBackground = "assets/parallaxBackgrounds/roadParallax3-Cut.png";
            }
        };

        var swapImage = function() {
            if (!calculationService.data.paused) {
                if($scope.image == "one") {
                    $scope.image = "two";
                }
                else if ($scope.image == "two") {
                    $scope.image = "one";
                }
            }
        };

        $scope.image = "one";

        $interval(swapImage, 2000);
        $interval(checkStage, 50);
    }

    angular.module("retirementRoad").controller("backgroundController", backgroundController);
})();