var app = angular.module("MilitaryApp", ["ngRoute", "Auth"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "components/home/home.html"
        })
        .when("/register", {
            templateUrl: "components/auth/register/register.html",
            controller: "RegisterController"
        })
        .when("/login", {
            templateUrl: "components/auth/login/login.html",
            controller: "LoginController"
        })
        .when("/soldier", {
            templateUrl: "components/soldier/soldier.html"
        })
        .when("/soldiers", {
            templateUrl: "components/soldier/soldiers.html",
            controller: "SoldierController"
        })
        .when("/tasks", {
            templateUrl: "components/tasks/tasks.html",
            controller: "TaskController"
        });
});