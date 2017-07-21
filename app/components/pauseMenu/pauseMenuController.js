(function(){

    function pauseMenuController($scope, $mdDialog){
        $scope.showMenu = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
            $mdDialog.show({
            controller: pauseMenuController,
            templateUrl: 'components/pauseMenu/pauseMenuTemplate.html',
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

    angular.module('retirementRoad').controller('pauseMenuController', pauseMenuController);

})();