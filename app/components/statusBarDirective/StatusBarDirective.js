(function () {
    function statusBar() {
        return {
            templateUrl: '/components/statusBarDirective/statusBarTemplate.html'
        };
    }

    function statusBarCtrl($scope, calcService) {
        $scope.calcService = calcService;
        return {
            templateUrl: '/components/statusBarDirective/statusBarTemplate.html'
        };
    }

    angular.module('retirementRoad')
        .directive('statusBar', statusBar)
        .controller('statusBarCtrl', ["$scope", "calculationService", statusBarCtrl]);
})();


