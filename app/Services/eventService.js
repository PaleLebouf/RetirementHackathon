angular.module("retirementRoad").service('eventService', ["$mdDialog", "calculationService", function($mdDialog, calculationService) {
    var self = this;
    var negativeEvents = [
        {
            controller: "negativeEventController",
            templateUrl: "components/negativeEvent/negativeEventTemplate.html",
            title: "You've Lost Your Job",
            imageUrl: "/Assets/images/jobloss.jpg",
            description: {
                base: "You lost your job.",
                covered: "Luckily you had an emergency fund to cover your time in between jobs. Way to be prepared!",
                notCovered:"You'll have to come up with the money from somewhere." 
            },
            getCost: function(){ return (calculationService.data.salary / 12) * 3; }
        },
        {
            controller: "negativeEventController",
            templateUrl: "components/negativeEvent/negativeEventTemplate.html",
            title: "There's Been a Medical Emergency",
            imageUrl: "/Assets/images/medicalEmergency.png",
            description: {
                base: "You suffered a serious medical emergency.",
                covered: "However you were prepared to cover your unexpected expense.",
                notCovered:"You'll have to find a way to pay those medical bills." 
            },
            getCost: function(){ return 25000; }
        }
    ];
    self.activeEvent = {};

    self.showJobLoss = function() {
        self.activeEvent = negativeEvents[0];
        showGameDialog(self.activeEvent.controller, self.activeEvent.templateUrl);
    };

    self.showMedicalEmergency = function() {
        self.activeEvent = negativeEvents[1];
        showGameDialog(self.activeEvent.controller, self.activeEvent.templateUrl);
    };

    self.showDebtPaidOff = function() {
        showGameDialog("positiveEventController", "components/positiveEvent/eventTemplates/debtPaidTemplate.html");
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