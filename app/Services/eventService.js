angular.module("retirementRoad").service('eventService', ["$mdDialog", "calculationService", function($mdDialog, calculationService) {
    var self = this;

    self.showJobLoss = function() {
        showGameDialog('negativeEventController', 'components/negativeEventDirective/events/negativeEventTemplate.html');
    };

    self.showMedicalEmergency = function() {
        showGameDialog('negativeEventController', 'components/negativeEventDirective/events/negativeEventMedicalTemplate.html');
    };

    self.showDebtPaidOff = function() {
        showGameDialog('negativeEventController', 'components/negativeEventDirective/events/debtPaidTemplate.html');
    };

    self.showMap = function() {
        showGameDialog('mapCtrl', 'components/map/map.html');
    };

    self.showWin = function() {
        showGameDialog('endScreenController', 'components/endScreen/endScreenTemplate.html');
    };

    function showGameDialog(controller, templateUrl, okFn, cancelFn) {
        calculationService.data.paused = true;
        // Appending dialog to document.body to cover sidenav in docs app
        $mdDialog.show({
        controller: controller,
        templateUrl: templateUrl,
        parent: angular.element(document.body),
        targetEvent: "",
        clickOutsideToClose:false,
        fullscreen: false // Only for -xs, -sm breakpoints.
        })
        .then(okFn, cancelFn);
    }

    return self;
}]);