var app = angular.module("Auth");

app.controller("LoginController", ["$scope", "$location", "SoldierService", function ($scope, $location, SoldierService) {
    $scope.login = function (soldier) {
        SoldierService.login(soldier).then(function (response) {
            $location.path("/tasks");
        }, function (response) {
            console.log(response);
            alert(response.data.message);
        });
    }
}]);