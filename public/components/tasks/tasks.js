var app = angular.module("MilitaryApp");

app.service("TaskService", ["$http", function ($http) {
    this.getTasks = function () {
        return $http.get("/api/tasks").then(function (response) {
            return response.data;
        }, function (response) {
            console.log("Error " + response.status + ": " + response.statusText);
        });
    };
    this.saveTask = function (task) {
        return $http.post("/api/tasks", task).then(function (response) {
            return response.data;
        }, function (response) {
            console.log("Error " + response.status + ": " + response.statusText);
        });
    };
    this.deleteTask = function (task) {
        return $http.delete("/api/tasks/" + task._id).then(function (response) {
            return response.data;
        }, function (response) {
            console.log("Error " + response.status + ": " + response.statusText);
        });
    };
}]);

app.controller("TaskController", ["$scope", "TaskService", function ($scope, TaskService) {
    
    (function getTasks() {
        TaskService.getTasks().then(function (tasks) {
            $scope.tasks = tasks;
        });
    })();
    
     $scope.addTask = function(task) {
        $scope.task = {};
        TaskService.saveTask(task).then(function (task) {
            $scope.tasks.push(task);
        });
    };
    
    $scope.deleteTask = function(task) {
        TaskService.deleteTask(task).then(function (tasks) {
            $scope.tasks = tasks;
        });
    };
}]);