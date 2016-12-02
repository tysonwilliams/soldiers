var app = angular.module("Auth");

app.controller("RegisterController", ["$scope", "$location", "SoldierService", function ($scope, $location, SoldierService) {
    $scope.passwordMessage = "";
    $scope.register = function (soldier) {
        if ($scope.soldier.password !== $scope.passwordRepeat) {
            $scope.passwordMessage = "Passwords entered do not match.";
        } else {
            SoldierService.register(soldier).then(function (response) {
                $location.path("/login");
            }, function (response) {
                alert("There was a problem registering: " + response.data.message);
            });
        }
    }
}]);