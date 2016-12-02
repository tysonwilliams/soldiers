var app = angular.module("Auth", ["ngStorage"]);

app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/register", {
            templateUrl: "components/auth/register/register.html",
            controller: "RegisterController"
        })
        .when("/login", {
            templateUrl: "components/auth/login/login.html",
            controller: "LoginController"
        })
        .when("/logout", {
            template: "",
            controller: "LogoutController"
        });
}]);

app.service("TokenService", ["$localStorage", function ($localStorage) {
    this.setToken = function (token) {
        $localStorage.token = token;
    };
    this.getToken = function () {
        return $localStorage.token;
    };
    this.removeToken = function () {
        delete $localStorage.token;
    };
}]);

app.service("SoldierService", ["$http", "TokenService", function ($http, TokenService) {
    this.register = function (soldier) {
        return $http.post("/auth/register", soldier);
    };
    this.login = function (soldier) {
        return $http.post("/auth/login", soldier).then(function (response) {
            TokenService.setToken(response.data.token);
        });
    };
    this.logout = function () {
        TokenService.removeToken();
    };
    this.isAuthenticated = function () {
        return !!TokenService.getToken();
    };
    this.getSoldiers = function () {
        return $http.get("/api/soldiers").then(function (response) {
            return response.data;
        }, function (response) {
            console.log("Error " + response.status + ": " + response.statusText);
        });
    };
}]);

app.service("AuthInterceptor", ["$q", "$location", "TokenService", function ($q, $location, TokenService) {
    this.request = function (config) {
        var token = TokenService.getToken();
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = "Bearer " + token;
        }
        return config;
    };
    this.responseError = function (response) {
        if (response.status === 401) {
            TokenService.removeToken();
            $location.path("/login");
        }
        return $q.reject(response);
    };
}]);

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push("AuthInterceptor");
});