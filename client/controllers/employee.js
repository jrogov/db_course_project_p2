var fiveyApp = angular.module('fiveyApp')

fiveyApp.controller('EmployeeController',
    [
        '$scope',
        '$http',
        '$location',
        '$routeParams',
    function($scope, $http, $location, $routeParams) {
        console.log('EmployeeController loaded');

        /*logic here*/
    }
]);