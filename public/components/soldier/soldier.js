var app = angular.module("MilitaryApp");

app.controller("SoldierController", ["$scope", "SoldierService", function ($scope, SoldierService) {

    (function getSubordinates() {
        SoldierService.getSubordinates().then(function (subordinates) {
            $scope.subordinates = subordinates;
        });
    })();
    
}]);