(function () {


    function statusBar() {
        return {
            templateUrl: '/components/statusBarDirective/statusBarTemplate.html'
        };
    }

    angular.module('retirementRoad').directive('statusBar', statusBar);
})();
