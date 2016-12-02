var app = angular.module("MilitaryApp");

app.directive("navbar", ["SoldierService", function (SoldierService) {
    return {
        templateUrl: "components/navbar/navbar.html",
        link: function(scope) {
            scope.SoldierService = SoldierService;
        }
    }
}]);