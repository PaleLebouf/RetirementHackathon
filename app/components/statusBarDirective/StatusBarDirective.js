(function () {
    function statusBar() {
        return {
            templateUrl: '/components/statusBarDirective/statusBarTemplate.html'
        };
    }

    function statusBarCtrl($scope, calcService) {
        $scope.data = calcService.data;

        $scope.pauseClick = function() {
            $scope.data.paused = true;
            showMedicalEmergency($event)   
        }
    }

    angular.module('retirementRoad')
        .directive('statusBar', statusBar)
        .controller('statusBarCtrl', ["$scope", "calculationService", statusBarCtrl]);
})();


