(function (){
function endScreenController($scope, $interval, $mdDialog, calculationService)
    {

        $scope.showWin = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
            
            $mdDialog.show({
            controller: endScreenController,
            templateUrl: 'components/endScreen/endScreenTemplate.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:false,
            fullscreen: true // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
            $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
            $scope.status = 'You cancelled the dialog.';
            });
            calcScore();
        };

        $scope.cancel = function() {
                $mdDialog.cancel();
        };

        var calcScore = function() {
            $scope.endScore = calculationService.calculateScore();
        };

        $interval(calcScore, 500);
    };

    angular.module('retirementRoad').controller('endScreenController', endScreenController);
})();