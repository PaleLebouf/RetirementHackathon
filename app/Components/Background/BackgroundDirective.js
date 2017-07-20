(function(){

    function scrollingBackground()
    {
        return{
            templateUrl:"/Components/BackgroundTemplate.html"
        };
    };

    angular.module('retirementRoad').directive('scrollingBackground', scrollingBackground);
})();