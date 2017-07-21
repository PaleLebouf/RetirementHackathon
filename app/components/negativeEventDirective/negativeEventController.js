(function() {

    function negativeEventController($scope, $interval, $mdDialog)
    {
        $scope.status = '  ';
        $scope.customFullscreen = false;

        $scope.showJobLoss = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
            $mdDialog.show({
            controller: DialogController,
            templateUrl: 'components/negativeEventDirective/negativeEventTemplate.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: false // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
            $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
            $scope.status = 'You cancelled the dialog.';
            });

            
        };
    };

    angular.module('retirementRoad').controller('negativeEventController', negativeEventController)
})();