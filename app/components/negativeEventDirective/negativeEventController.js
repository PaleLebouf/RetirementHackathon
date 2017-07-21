(function() {

    function negativeEventController($scope, $interval, $mdDialog)
    {

        $scope.showJobLoss = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
            $mdDialog.show({
            controller: negativeEventController,
            templateUrl: 'components/map/map.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:false,
            fullscreen: false // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
            $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
            $scope.status = 'You cancelled the dialog.';
            });
            
        };


        $scope.showMedicalEmergency = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
            $mdDialog.show({
            controller: negativeEventController,
            templateUrl: 'components/negativeEventDirective/negativeEventMedicalTemplate.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:false,
            fullscreen: false // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
            $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
            $scope.status = 'You cancelled the dialog.';
            });
            
        };

        $scope.cancel = function() {
                $mdDialog.cancel();
        };
    };

    angular.module('retirementRoad').controller('negativeEventController', negativeEventController);
})();