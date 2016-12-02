var app = angular.module("MilitaryApp");

app.controller("SoldierController", ["$scope", "SoldierService", function ($scope, SoldierService) {
    $scope.soldier = {};
    $scope.soldiers = [];

    (function getSoldiers() {
        SoldierService.getSoldiers().then(function (soldiers) {
            $scope.soldiers = soldiers;
        });
    })();
    
}]);