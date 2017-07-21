(function () {

    

    function negativeEvent() {
        return {
            templateUrl: '/components/negativeEventDirective/negativeEventTemplate.html'
        };
    }

    angular.module('retirementRoad').directive('negativeEvent', negativeEvent);
})();


