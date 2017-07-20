(function () {


    function background() {
        return {
            templateUrl: '/components/Background/BackgroundTemplate.html'
        };
    }

    angular.module('retirementRoad').directive('background', background);
})();
