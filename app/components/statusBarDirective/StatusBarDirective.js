(function () {
    function statusBar() {
        return {
            templateUrl: '/components/statusBarDirective/statusBarTemplate.html'
        };
    }

    function statusBarCtrl($scope, calcService, $interval, $mdDialog) {
        $scope.data = calcService.data;

        $scope.$watch("data.debt", function(newValue, oldValue, scope) {
            if (newValue <= 0) {
                $scope.data.paused = true;
                $scope.showDebtPaidOff("")
                $scope.data.stage++;
            }
        })

        $scope.pauseClick = function() {
            $scope.data.paused = true;
            if ($scope.data.stage == 2) {
                $scope.showJobLoss("");
            }
            else if ($scope.data.stage == 3) {
                $scope.showMedicalEmergency("")
            }
            $scope.data.stage++;
        }

        $scope.showJobLoss = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
            $mdDialog.show({
            controller: 'negativeEventController',
            templateUrl: 'components/negativeEventDirective/negativeEventTemplate.html',
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
            controller: 'negativeEventController',
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

        $scope.showDebtPaidOff = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
            $mdDialog.show({
            controller: 'negativeEventController',
            templateUrl: 'components/negativeEventDirective/debtPaidTemplate.html',
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
    }

    angular.module('retirementRoad')
        .directive('statusBar', statusBar)
        .controller('statusBarCtrl', ["$scope", "calculationService", "$interval", "$mdDialog", statusBarCtrl]);
})();


