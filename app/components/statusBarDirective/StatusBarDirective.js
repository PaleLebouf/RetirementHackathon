(function () {
    function statusBar() {
        return {
            templateUrl: '/components/statusBarDirective/statusBarTemplate.html'
        };
    }

    function statusBarCtrl($scope, calcService, eventService) {
        $scope.data = calcService.data;

        $scope.$watch("data.debt", function(newValue, oldValue, scope) {
            if (newValue <= 0) {
                //$scope.data.paused = true;
                eventService.showDebtPaidOff()
                $scope.data.stage++;
            }
        })

        $scope.pauseClick = function() {
            if ($scope.data.stage != 1) {
                $scope.data.paused = true;
                if ($scope.data.stage == 2) {
                    eventService.showJobLoss();
                }
                else if ($scope.data.stage == 3) {
                    eventService.showMedicalEmergency()
                }
                else if ($scope.data.stage > 3) {
                    eventService.showWin();
                }
                $scope.data.stage++;
            }
        }
    }

    angular.module('retirementRoad')
        .directive('statusBar', statusBar)
        .controller('statusBarCtrl', ["$scope", "calculationService", "eventService", statusBarCtrl]);
})();


