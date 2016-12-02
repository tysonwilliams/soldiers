var app = angular.module("Auth");

app.controller("LogoutController", ["$scope", "$location", "SoldierService", function ($scope, $location, SoldierService) {
    SoldierService.logout();
    $location.path("/");
}]);