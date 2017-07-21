(function() {

    function negativeEventController($scope, $interval, $mdDialog)
    {
        $scope.status = '  ';
        $scope.customFullscreen = false;

        $scope.showJobLoss = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('You\'re Fired!')
                .textContent('You lost your job, you\'ll be living of your savings for a while.')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Sweet')
                .cancel('Just What I Wanted');

            $mdDialog.show(confirm).then(function() {
            $scope.status = 'You decided to get rid of your debt.';
            }, function() {
            $scope.status = 'You decided to keep your debt.';
            });
        };
    };

    angular.module('retirementRoad').controller('negativeEventController', negativeEventController)
})();