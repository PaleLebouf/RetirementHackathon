(function () {
    function statusBar() {
        return {
            templateUrl: '/components/statusBarDirective/statusBarTemplate.html'
        };
    }

    function statusBarCtrl($scope, calcService, eventService) {
        $scope.data = calcService.data;

        $scope.pullover = function() {
            eventService.showMap();
        }

        $scope.pauseClick = function() {
            $scope.data.paused = true;
            if ($scope.data.stage == 1) {
                calcService.calculateValuesforMonths(calcService.calculateMonthsUntilDebtPayoff());
                $scope.data.paused = false;
            }
            else if ($scope.data.stage == 2) {
                calcService.calculateValuesforMonths(24);
                eventService.showJobLoss();
                $scope.data.stage++;
            }
            else if ($scope.data.stage == 3) {
                calcService.calculateValuesforMonths(calcService.calculateNumberOfMonthsUntilRetirementAge(calcService.data.month) / 2);
                eventService.showMedicalEmergency()
                $scope.data.stage++;
            }
            else if ($scope.data.stage > 3) {
                calcService.calculateValuesforMonths(calcService.calculateNumberOfMonthsUntilRetirementAge(calcService.data.month));
                eventService.showWin();
            }
        }
    }

    angular.module('retirementRoad')
        .directive('statusBar', statusBar)
        .controller('statusBarCtrl', ["$scope", "calculationService", "eventService", statusBarCtrl]);
})();


