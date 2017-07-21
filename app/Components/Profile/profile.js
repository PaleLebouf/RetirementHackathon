var app=angular.module("retirementRoad");
app.controller("ProfileController", ["$scope", "calculationService", function($scope, calcService){

    $scope.calcService = calcService.data;
    $scope.age=["18","22","26"];
}]);